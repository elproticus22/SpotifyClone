import React, { useContext, useEffect, useState } from "react";
import Navbar from "./nav-var";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { deezerService } from "../services/deezerService";
import { assets } from "../assets/assets";

const DisplayAlbum = () => {
    const { id } = useParams();
    const { playWithId } = useContext(PlayerContext);
    const [albumData, setAlbumData] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchAlbumData = async () => {
            const albumDetails = await deezerService.getAlbumDetails(id);
            const albumTracks = await deezerService.getAlbumTracks(id);
            setAlbumData(albumDetails);
            setTracks(albumTracks);
        };

        if (id) {
            fetchAlbumData();
        }
    }, [id]);

    if (!albumData) {
        return <div>Loading...</div>;
    }

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return(
        <>
            <Navbar/>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={albumData.cover_medium} alt={albumData.title} />
                <div className="flex flex-col">
                    <p>Album</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.title}</h2>
                    <h4>{albumData.artist.name}</h4>
                    <p className="mt-1">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="Deezer" />
                        <span className="font-bold">Deezer● </span>
                        {albumData.fans} fans 
                        <span className="font-bold"> ● {albumData.nb_tracks} songs, </span>
                        about {Math.floor(albumData.duration / 60)} min
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p><span className="mr-4 font-bold">#</span>Title</p>
                <p>Album</p>
                <p className="hidden sm:block">Date added</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr />
            {tracks.map((track, index) => (
                <div
                onClick={() => playWithId(track.id)} 
                key={index} 
                className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                >
                <p>
                    <span className="mr-4 text-[#a7a7a7] text-bold">{index + 1}</span>
                    <img className="inline w-10 mr-5" src={albumData.cover_small} alt="" />
                    {track.title}
                </p>
                <p className="text-[15px]">{albumData.title}</p>
                <p className="text-[15px] hidden sm:block">{new Date(albumData.release_date).toLocaleDateString()}</p>
                <p className="text-[15px] text-center">{formatDuration(track.duration)}</p>
                </div>
            ))}
        </>
    )
}

export default DisplayAlbum