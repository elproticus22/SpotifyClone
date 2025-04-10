import React, { useContext} from 'react'
import Sidebar from '../Components/sidebar'
import Player from '../Components/player'
import Display from '../Components/display'
import { PlayerContext } from '../context/PlayerContext'

const Main = () =>{
    
    const {audioRef, track} = useContext(PlayerContext)

    return(
        <div className='h-screen bg-black'>
            <div className='h-[90%] flex'>
                <Sidebar />
                <Display />
            </div>
            <Player />
            <audio ref={audioRef} src={track.file} preload='auto'></audio>
        </div>
    )
}

export default Main