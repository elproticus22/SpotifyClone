import React, { useEffect, useState } from "react";
import Navbar from "./nav-var";
import AlbumItem from "./album-item";
import SongItem from "./songitem";
import { deezerService } from "../services/deezerService";

const DisplayHome = () => {
    const [featuredAlbums, setFeaturedAlbums] = useState([]);
    const [todaysHits, setTodaysHits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const albums = await deezerService.getFeaturedCharts();
            const hits = await deezerService.getTodaysHits();
            setFeaturedAlbums(albums);
            setTodaysHits(hits);
        };

        fetchData();
    }, []);

    return(
        <>
            <Navbar />
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex overflow-auto">
                    {featuredAlbums.map((album, index) => (
                        <AlbumItem 
                            key={index} 
                            name={album.title} 
                            desc={album.artist.name} 
                            id={album.id} 
                            image={album.cover_medium}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
                <div className="flex overflow-auto">
                    {todaysHits.map((track, index) => (
                        <SongItem 
                            key={index} 
                            name={track.title} 
                            desc={track.artist.name} 
                            id={track.id} 
                            image={track.album.cover_medium}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default DisplayHome