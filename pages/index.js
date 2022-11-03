import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import ItemCard from "../components/ItemCard";

const fetcher = (url) =>
  axios.get(url).then((res) => {
    const data = res?.data ?? [];

    const filtered = data.filter((item) => {
      const { name } = item;
      const words = ["Rio", "2022"];

      const nameMatch = words.every((word) =>
        name.toLowerCase().includes(word.toLowerCase())
      );

      return nameMatch;
    });

    const selected = filtered.sort(() => Math.random() - 0.5).splice(0, 28);

    return selected;
  });

export default function Home() {
  const { data } = useSWR(
    `https://bymykel.github.io/CSGO-API/api/stickers.json`,
    fetcher
  );

  return (
    <>
      <Head>
        <title>CSGO ITEMS</title>
        <meta
          name="description"
          content="List of CS:GO skins, cases, stickers, collections, collectibles, agents, graffiti, keys, patches and music kits."
        />
      </Head>

      <div className="flex flex-col items-center pt-16">
        <h1 className="text-6xl font-bold text-center text-transparent sm:max-w-3xl md:text-7xl bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
          THE RIO MAJOR
        </h1>

        <p className="pb-6 mt-3 text-base text-center text-stone-600 dark:text-stone-200 sm:max-w-xl sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
          Some examples of the Rio Major team and autograph stickers.{" "}
          <Link href="/search?q=rio%202022">
            <a className="text-indigo-400 duration-100 hover:text-indigo-500">
              Click here
            </a>
          </Link>{" "}
          to see all the new added items.
        </p>

        <div className="items-grid-small sm:items-grid">
          {data &&
            data.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  route={{ type: "stickers", id: item.id }}
                  name={item.name}
                  image={item.image}
                  rarity={item.rarity}
                ></ItemCard>
              );
            })}
        </div>
      </div>
    </>
  );
}
