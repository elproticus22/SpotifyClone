import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/supabase";
import logo from './assets/spotify-white-logo.png' 

const login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function getEmail(e) {
    setEmail(e.target.value);
  }

  function getPassword(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor rellene todos los campos");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Hubo un error al iniciar sesión:", error.message);
      alert("Credenciales incorrectas o error al iniciar sesión.");
      return;
    }

    if (data?.user) {
      navigate('/main');
    }
  }



    return(
        <>
    <main className="bg-linear-to-b from-neutral-700 via-neutral-900 to-black h-full flex items-center justify-center grid-flow-col flex-col">

        <section className="bg-neutral-900 p-40 rounded-lg text-white flex justify-center items-center flex-col mt-8 h-150 ">
        <img src={logo} alt="Spotify logo" className="h-10 w-10"/>
        <h1 className="text-[30px] font-bold">Log in to spotify</h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10">
            <span className="flex flex-col justify-center">
            <label htmlFor="Email" className="font-bold text-sm">Email</label>
            <input id="Email"  className="mt-2 border-neutral-400 border-1 rounded-sm w-72 h-11 hover:border-white p-2 border-solid" onChange={getEmail} type="email" value={email} placeholder="Email" /> <br />
            </span>
            <span className="flex flex-col">
            <label htmlFor="Password" className="font-bold text-sm">Password</label>
            <input id="Password" className="mt-2 border-neutral-400 border-1 rounded-sm w-72 h-11 hover:border-white p-2 border-solid" onChange={getPassword} type="password" value={password} placeholder="Password"/><br />
            </span>
            <button className="mt-2 border-2 border-green-500 rounded-full px-22 py-2 text-black font-bold bg-green-500 hover:pt-3 hover:px-23 hover:border-green-400 hover:bg-green-400" type="submit">Iniciar Sesion</button>
        </form>
        <br /> <br />
        <span className="text-neutral-400 font-medium">Don't have an account?<Link to="/register" className="text-white decoration-2 underline">Sign up for Spotify</Link></span>
        </section>
        <section className="mt-7">
        <footer className="h-20 w-screen bg-neutral-900 text-neutral-400 flex items-center justify-center text-xs">This site is protected by reCAPTCHA and the Google <span className="text-neutral-900">. </span><span><a href="https://policies.google.com/privacy" className="underline font-normal"> Privacy Policy  </a></span><span className="text-neutral-900">. </span> and <span className="text-neutral-900">. </span><span><a href="https://policies.google.com/terms" className="underline font-normal"> Terms of Service </a></span><span className="text-neutral-900">. </span> apply.</footer>
        </section>
    </main>
    </>
    )
}

export default login

