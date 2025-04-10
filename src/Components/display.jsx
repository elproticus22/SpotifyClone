import React, { useState, useEffect, useContext } from "react";
import DisplayHome from "./display-home";
import { Route, Routes } from "react-router-dom";
import DisplayAlbum from "./displayAlbum";
import { deezerService } from "../services/deezerService";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({ tracks: [], artists: [] });
    const [isSearching, setIsSearching] = useState(false);
    const { playWithId } = useContext(PlayerContext);

    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true);
                try {
                    const results = await deezerService.search(searchQuery);
                    setSearchResults(results);
                } catch (error) {
                    console.error("Search error:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults({ tracks: [], artists: [] });
            }
        }, 500);

        return () => clearTimeout(searchTimeout);
    }, [searchQuery]);

    const handleTrackClick = async (track) => {
        try {
            const previewUrl = await deezerService.getTrackPreview(track.id);
            if (previewUrl) {
                playWithId(track.id, {
                    name: track.title,
                    desc: track.artist.name,
                    image: track.album.cover_medium,
                    preview: previewUrl
                });
            }
        } catch (error) {
            console.error("Error playing track:", error);
        }
    };

    return (
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search for songs, artists, or albums"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 rounded-full bg-[#282828] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
            </div>

            {searchQuery ? (
                <div className="space-y-8">
                    {isSearching ? (
                        <div className="text-center text-gray-400">Searching...</div>
                    ) : (
                        <>
                            {searchResults.tracks.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Songs</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {searchResults.tracks.map((track) => (
                                            <div
                                                key={track.id}
                                                onClick={() => handleTrackClick(track)}
                                                className="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors cursor-pointer"
                                            >
                                                <img
                                                    src={track.album.cover_medium}
                                                    alt={track.title}
                                                    className="w-full aspect-square object-cover rounded mb-2"
                                                />
                                                <h3 className="font-semibold truncate">{track.title}</h3>
                                                <p className="text-gray-400 text-sm truncate">
                                                    {track.artist.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {searchResults.artists.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Artists</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {searchResults.artists.map((artist) => (
                                            <div
                                                key={artist.id}
                                                className="bg-[#282828] p-4 rounded-lg hover:bg-[#383838] transition-colors cursor-pointer"
                                            >
                                                <img
                                                    src={artist.picture_medium}
                                                    alt={artist.name}
                                                    className="w-full aspect-square object-cover rounded-full mb-2"
                                                />
                                                <h3 className="font-semibold text-center">{artist.name}</h3>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!isSearching && searchResults.tracks.length === 0 && searchResults.artists.length === 0 && (
                                <div className="text-center text-gray-400">
                                    No results found for "{searchQuery}"
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <Routes>
                    <Route path='/' element={<DisplayHome/>}/>
                    <Route path='/:id' element={<DisplayAlbum/>}/>
                </Routes>
            )}
        </div>
    );
};

export default Display;