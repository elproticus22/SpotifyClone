import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex gap-8">
                <Link to="/" className="flex items-center gap-2">
                    <img className="w-10" src={assets.spotify_logo} alt="Spotify" />
                    <span className="text-xl font-bold">Spotify</span>
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200">
                    Sign Up
                </button>
                <button className="bg-transparent text-white border border-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-black">
                    Log In
                </button>
            </div>
        </div>
    );
};

export default Navbar;