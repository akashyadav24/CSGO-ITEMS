import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="px-4 mx-auto lg:px-8 max-w-7xl">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
