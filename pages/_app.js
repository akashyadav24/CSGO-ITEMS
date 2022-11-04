import CommandPalette from "../components/CommandPalette";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "../styles/globals.css";
import Script from "next/script";

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
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-NYJQBFE09Z`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NYJQBFE09Z', {
          page_path: window.location.pathname,
          });
        `}
      </Script>

      <Navbar openPalette={open} togglePalette={setOpen} />
      <CommandPalette openPalette={open} togglePalette={setOpen} />
      <main className="px-4 mx-auto lg:px-8 max-w-7xl">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
