import { useRef, createContext, useState, useEffect} from "react";
import { deezerService } from "../services/deezerService";

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {
    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const [track, setTrack] = useState({
        id: null,
        name: '',
        desc: '',
        image: '',
        preview: ''
    })
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:30,
            minute:0
        }
    })
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [previousVolume, setPreviousVolume] = useState(1)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play()
            setPlayStatus(true)
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause()
            setPlayStatus(false)
        }
    }

    const playWithId = async (id, trackData = null) => {
        try {
            const previewUrl = await deezerService.getTrackPreview(id)
            if (previewUrl) {
                let newTrack
                if (trackData) {
                    newTrack = {
                        id: id,
                        name: trackData.name,
                        desc: trackData.desc,
                        image: trackData.image,
                        preview: previewUrl
                    }
                } else {
                    const trackInfo = await new Promise((resolve) => {
                        const script = document.createElement('script');
                        script.src = `https://api.deezer.com/track/${id}?output=jsonp&callback=handleTrackData`;
                        window.handleTrackData = (data) => {
                            resolve(data);
                            document.body.removeChild(script);
                            delete window.handleTrackData;
                        };
                        document.body.appendChild(script);
                    });

                    newTrack = {
                        id: id,
                        name: trackInfo.title,
                        desc: trackInfo.artist.name,
                        image: trackInfo.album.cover_medium,
                        preview: previewUrl
                    }
                }
                setTrack(newTrack)
                if (audioRef.current) {
                    audioRef.current.src = previewUrl
                    await audioRef.current.play()
                    setPlayStatus(true)
                }
            }
        } catch (error) {
            console.error('Error playing track:', error)
        }
    }

    const setAlbum = (album) => {
        setCurrentAlbum(album)
        setCurrentTrackIndex(0)
    }

    const getNextTrackIndex = () => {
        if (!currentAlbum) return -1
        if (isShuffled) {
            let randomIndex
            do {
                randomIndex = Math.floor(Math.random() * currentAlbum.tracks.length)
            } while (randomIndex === currentTrackIndex)
            return randomIndex
        }
        return (currentTrackIndex + 1) % currentAlbum.tracks.length
    }

    const getPreviousTrackIndex = () => {
        if (!currentAlbum) return -1
        if (isShuffled) {
            let randomIndex
            do {
                randomIndex = Math.floor(Math.random() * currentAlbum.tracks.length)
            } while (randomIndex === currentTrackIndex)
            return randomIndex
        }
        return (currentTrackIndex - 1 + currentAlbum.tracks.length) % currentAlbum.tracks.length
    }

    const next = async () => {
        if (currentAlbum) {
            const nextIndex = getNextTrackIndex()
            if (nextIndex !== -1) {
                setCurrentTrackIndex(nextIndex)
                const track = currentAlbum.tracks[nextIndex]
                await playWithId(track.id, {
                    name: track.title,
                    desc: track.artist.name,
                    image: currentAlbum.cover_medium,
                    preview: track.preview
                })
            }
        }
    }

    const previous = async () => {
        if (currentAlbum) {
            const prevIndex = getPreviousTrackIndex()
            if (prevIndex !== -1) {
                setCurrentTrackIndex(prevIndex)
                const track = currentAlbum.tracks[prevIndex]
                await playWithId(track.id, {
                    name: track.title,
                    desc: track.artist.name,
                    image: currentAlbum.cover_medium,
                    preview: track.preview
                })
            }
        }
    }

    const toggleLoop = () => {
        setIsLooping(!isLooping)
        if (audioRef.current) {
            audioRef.current.loop = !isLooping
        }
    }

    const toggleShuffle = () => {
        setIsShuffled(!isShuffled)
    }

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.volume = previousVolume
                setVolume(previousVolume)
            } else {
                setPreviousVolume(volume)
                audioRef.current.volume = 0
                setVolume(0)
            }
            setIsMuted(!isMuted)
        }
    }

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
            setVolume(newVolume)
            if (newVolume === 0) {
                setIsMuted(true)
            } else {
                setIsMuted(false)
            }
        }
    }

    const seekSong = async (e) => {
        if (audioRef.current && seekBg.current) {
            const seekTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * 30
            audioRef.current.currentTime = seekTime
            setTime({
                ...time,
                currentTime: {
                    second: Math.floor(seekTime % 60),
                    minute: Math.floor(seekTime / 60)
                }
            })
        }
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                if (seekBar.current) {
                    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/30*100)) + "%"
                }
                setTime({
                    ...time,
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    }
                })
            }

            audioRef.current.onended = () => {
                if (isLooping) {
                    audioRef.current.currentTime = 0
                    audioRef.current.play()
                } else if (currentAlbum) {
                    next()
                } else {
                    setPlayStatus(false)
                }
            }
        }
    }, [audioRef.current, currentAlbum, isLooping])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        seekSong,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        handleVolumeChange,
        previous,
        next,
        isLooping,
        toggleLoop,
        isShuffled,
        toggleShuffle,
        setAlbum
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider