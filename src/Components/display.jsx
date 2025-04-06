import React, { useRef } from "react";
import DisplayHome from "./display-home";
import { Route, Routes, } from "react-router-dom";
import DisplayAlbum from "./displayAlbum";

const Display = () => {


    return(
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            <Routes>
            <Route path='/' element={<DisplayHome/>}/>
            <Route path='/:id' element={<DisplayAlbum/>}/>
            </Routes>
        </div>
    )
}

export default Display