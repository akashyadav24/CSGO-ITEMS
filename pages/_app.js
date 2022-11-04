import CommandPalette from "../components/CommandPalette";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import * as ga from "../lib/ga";

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
