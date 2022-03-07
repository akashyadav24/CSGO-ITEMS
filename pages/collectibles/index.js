import Head from "next/head";
import { useEffect, useState } from "react";
import CollectiblesNavbar from "../../components/CollectiblesNavbar";
import ItemCard from "../../components/ItemCard";
import SpinnerLoader from "../../components/SpinnerLoader";
import { getCollectibles } from "../../services/csgo";

export default function Collectibles() {
  const [loading, setLoading] = useState(false);
  const [collectibles, setCollectibles] = useState([]);
  const [showedItems, setShowedItems] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const { data } = await getCollectibles();

        setShowedItems(data.splice(0, 20));
        setCollectibles(data);
        setLoading(false);
      } catch (e) {
        setCollectibles([]);
        console.error(e);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const lastItemLoaded = document.querySelector(
      ".items-grid > .group:last-child"
    );
    if (lastItemLoaded) {
      const lastItemLoadedOffset =
        lastItemLoaded.offsetTop + lastItemLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > lastItemLoadedOffset) {
        if (collectibles.length) {
          const all = collectibles;
          const selected = all.splice(0, 20);
          setShowedItems([...showedItems, ...selected]);
          setCollectibles(all);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Collectibles - CSGO ITEMS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CollectiblesNavbar />
      <SpinnerLoader loading={loading} />
      <div className="items-grid">
        {showedItems.map((item) => {
          return (
            <ItemCard
              key={item.id}
              name={item.name}
              image={item.image}
              rarity={item.rarity}
            ></ItemCard>
          );
        })}
      </div>
    </>
  );
}
