import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard";
import ItemsFilter from "../../components/ItemsFilter";
import SpinnerLoader from "../../components/SpinnerLoader";
import { getCollectibles } from "../../services/csgo";

function capitalize(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

const navigation = [
  { name: "All", href: "/collectibles" },
  { name: "Major", href: "/collectibles/major" },
  { name: "Operation", href: "/collectibles/operation" },
  { name: "Map coins", href: "/collectibles/map_coins" },
  { name: "Pins", href: "/collectibles/pins" },
  { name: "Service medals", href: "/collectibles/service_medals" },
  { name: "Other", href: "/collectibles/other" },
];

export default function CollectiblesByType() {
  const router = useRouter();
  const { type } = router.query;

  const [loading, setLoading] = useState(false);
  const [collectibles, setCollectibles] = useState([]);
  const [showedItems, setShowedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const { data } = await getCollectibles(type);

        setCollectibles([...data]);
        setShowedItems(data.splice(0, 20));
        setFilteredItems(data);
        setLoading(false);
      } catch (e) {
        setCollectibles([]);
        console.error(e);
      }
    }
    getData();
  }, [type]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    const filtered = collectibles.filter((item) => {
      if (search === "") return true;
      return item.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredItems(filtered);
    setShowedItems(filtered.splice(0, 20));
  }, [search]);

  const handleScroll = () => {
    const lastItemLoaded = document.querySelector(
      ".items-grid > .group:last-child"
    );
    if (lastItemLoaded) {
      const lastItemLoadedOffset =
        lastItemLoaded.offsetTop + lastItemLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > lastItemLoadedOffset) {
        if (filteredItems.length) {
          const all = filteredItems;
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
        <title>
          Collectibles / {capitalize(type?.split("_").join(" "))} - CSGO ITEMS
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ItemsFilter filter={true} filterOptions={navigation} search={search} setSearch={setSearch} />
      <SpinnerLoader loading={loading} />
      <div className="items-grid">
        {showedItems.map((item) => {
          return (
            <ItemCard
              key={item.id}
              route={{ type: "collectibles", id: item.id }}
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
