import React, { useContext } from "react";
import Navbar from "./nav-var";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {

    const {id} = useParams()
    const albumData = albumsData[id]
    // use this later on when youre using the dezzer api call good luck on that heh console.log(albumData)

    const {playWithId} = useContext(PlayerContext)

    return(
        <>
            <Navbar/>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={albumData.image} alt="" />
                <div className="flex flex-col ">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className="mt-1">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
                        <span className="font-bold">Spotify● </span>
                        2,222,222 likes 
                        <span className="font-bold"> ● 50 songs, </span>
                        about 2 hr 20 min
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
            {
                songsData.map((item, index)=>(
                    <div onClick={()=>playWithId(item.id)} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
                        <p><span className="mr-4 text-[#a7a7a7] text-bold">{index+1}</span>
                        <img className="inline w-10 mr-5" src={item.image} alt="" />
                        {item.name}
                        </p>
                        <p className="text-[15px]">{albumData.name}</p>
                        <p className="text-[15px] hidden sm:block">5 days ago</p>
                        <p className="text-[15px] text-center">{item.duration}</p>
                    </div>
                ))
            }
        </>
    )
}

export default DisplayAlbum