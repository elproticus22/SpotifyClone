import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../data/supabase";
import logo from '../assets/spotify-white-logo.png' 

const register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Por favor rellena todos los campos");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Error al registrarse:", error.message);
        alert("No se pudo crear la cuenta");
        return;
      }

      alert("Cuenta creada. Revisa tu correo para confirmar.");
      navigate("/");
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Algo salió mal.");
    }
  };

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);


  const isPasswordValid = (password) => {
    const check = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[A-Z]).+$/;
    return check.test(password);
  };
  

  return (
    <main className="bg-neutral-900 min-h-screen flex items-center justify-center">
      <section className="bg-neutral-900 px-12 py-10 rounded-lg w-full max-w-md text-white flex flex-col justify-center items-center">
        <header className="flex justify-center mb-8">
          <img
            src={logo}
            alt="Spotify Logo"
            className="h-10"
          />
        </header>
        <h1 className="text-4xl font-bold text-center mb-8">Sign up to start listening</h1>

        <form onSubmit={handleSignup} className="flex flex-col">
          <div>
            <label htmlFor="email" className="text-sm font-semibold mb-1 block">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-neutral-400 border-1 rounded-sm w-72 h-11 hover:border-white p-2 border-solid"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password" className="text-sm font-semibold mb-1 block">
              Create a password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-neutral-400 border-1 rounded-sm w-72 h-11 hover:border-white p-2 border-solid"
            />
            <br />
            <span className="">
                <p>Password must contain</p>
                <p className={`${hasLetter ? 'text-white' : 'text-neutral-500'}`}>
                  <span className="text-white font-black text-20">-</span>At least one letter
                </p>
                <p className={`${hasNumber ? 'text-white' : 'text-neutral-500'}`}>
                  <span className="text-white font-black text-20">-</span>At least one number
                </p>
                <p className={`${hasUppercase ? 'text-white' : 'text-neutral-500'}`}>
                  <span className="text-white font-black text-20">-</span>At least one uppercase letter
                </p>
            </span>
          </div>
          <br />

          <button
            disabled={!isPasswordValid(password)}
            type="submit"
            className="w-74 mt-2 bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-full transition-all duration-200"
          >
            Sign Up
          </button>
        </form>

        <br /><br />            
        <article>
        <span className="text-neutral-400 font-medium">Already have an account?<Link to="/" className="text-white decoration-2 underline">Log in here.</Link></span>
        </article>           
        
        <footer className="border-t border-neutral-800 mt-10 pt-6 text-xs text-neutral-400 text-center">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </footer>
      </section>
    </main>
  );
};

export default register;
