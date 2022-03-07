import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>CSGO ITEMS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center pt-40 text-center">
        <h1 className="text-6xl font-bold text-transparent sm:max-w-2xl md:text-8xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          CSGO ITEMS
        </h1>
        <p className="mt-3 text-base text-stone-600 sm:max-w-xl sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
          Simple example of what you can do with the{" "}
          <Link href="https://bymykel.me/CSGO-API/">
            <a
              className="text-indigo-400 duration-100 hover:text-indigo-500"
              target="_blank"
            >
              CSGO API
            </a>
          </Link>
          .
        </p>
      </div>
    </>
  );
}
