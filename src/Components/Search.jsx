import React, { useState, useEffect } from 'react';
import { deezerService } from '../services/deezerService';
import { PlayerContext } from '../context/PlayerContext';
import { useContext } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ tracks: [], artists: [] });
    const [isLoading, setIsLoading] = useState(false);
    const { playWithId } = useContext(PlayerContext);

    useEffect(() => {
        const searchTimeout = setTimeout(async () => {
            if (query.trim() === '') {
                setResults({ tracks: [], artists: [] });
                return;
            }

            setIsLoading(true);
            try {
                const searchResults = await deezerService.search(query);
                setResults(searchResults);
            } catch (error) {
                console.error('Error searching:', error);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(searchTimeout);
    }, [query]);

    return (
        <div className="w-full p-4">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for artists or songs..."
                    className="w-full p-2 pl-10 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {isLoading && (
                <div className="mt-4 text-center text-gray-400">Loading...</div>
            )}

            {!isLoading && (results.tracks.length > 0 || results.artists.length > 0) && (
                <div className="mt-4 space-y-6">
                    {results.tracks.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Songs</h2>
                            <div className="space-y-2">
                                {results.tracks.map((track) => (
                                    <div
                                        key={track.id}
                                        onClick={() => playWithId(track.id)}
                                        className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                                    >
                                        <img
                                            src={track.album.cover_small}
                                            alt={track.title}
                                            className="w-12 h-12 rounded"
                                        />
                                        <div>
                                            <p className="font-medium">{track.title}</p>
                                            <p className="text-sm text-gray-400">{track.artist.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {results.artists.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Artists</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {results.artists.map((artist) => (
                                    <div
                                        key={artist.id}
                                        className="flex flex-col items-center p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                                    >
                                        <img
                                            src={artist.picture_medium}
                                            alt={artist.name}
                                            className="w-24 h-24 rounded-full mb-2"
                                        />
                                        <p className="text-center font-medium">{artist.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {!isLoading && query.trim() !== '' && results.tracks.length === 0 && results.artists.length === 0 && (
                <div className="mt-4 text-center text-gray-400">No results found</div>
            )}
        </div>
    );
};

export default Search; 