import CommandPalette from "../components/CommandPalette";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <Navbar openPalette={open} togglePalette={setOpen} />
      <CommandPalette openPalette={open} togglePalette={setOpen} />
      <main className="px-4 mx-auto lg:px-8 max-w-7xl">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
