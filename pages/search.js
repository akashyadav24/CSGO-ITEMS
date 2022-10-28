import Head from "next/head";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import ItemsFilter from "../components/ItemsFilter";
import SpinnerLoader from "../components/SpinnerLoader";
import { getAllItems } from "../services/csgo";
import { useRouter } from "next/router";

function getType(item) {
  const types = {
    agent: "agents",
    collectible: "collectibles",
    crate: "crates",
    sticker: "stickers",
    collection: "collections",
    graffiti: "graffiti",
    key: "keys",
    patch: "patches",
    music: "music-kits",
    skin: "skins",
  };

  return types[item.id.split("-")[0]];
}

export default function Skins() {
  const [loading, setLoading] = useState(false);
  const [skins, setSkins] = useState([]);
  const [showedItems, setShowedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    async function getData() {
      if (!router.isReady) return;

      try {
        setLoading(true);

        const data = await getAllItems().then((res) => Object.values(res.data));

        setSkins([...data]);
        setShowedItems(data.splice(0, 20));
        if (!q) {
          setFilteredItems(data);
        } else {
          setSearch(q);
        }

        setLoading(false);
      } catch (e) {
        setSkins([]);
        console.error(e);
      }
    }
    getData();
  }, [router.isReady]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    if (q) {
      setSearch(q);
    }
  }, [q]);

  useEffect(() => {
    history.replaceState({}, null, `/search?q=${search}`);

    if (search === "") {
      setFilteredItems([]);
      setShowedItems([]);
      return;
    }

    const words = search.split(" ");

    const filtered = skins.filter((item) => {
      const { name } = item;
      const nameMatch = words.every((word) =>
        name.toLowerCase().includes(word.toLowerCase())
      );

      return nameMatch;
    });

    setFilteredItems(filtered);
    setShowedItems(filtered.splice(0, 20));
  }, [skins, search]);

  const handleScroll = () => {
    const lastItemLoaded =
      document.querySelector(".items-grid > .group:last-child") ||
      document.querySelector(".items-grid-small > .group:last-child");
    if (lastItemLoaded) {
      const lastItemLoadedOffset =
        lastItemLoaded.offsetTop + lastItemLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;

      if (pageOffset > lastItemLoadedOffset) {
        if (filteredItems.length) {
          const all = filteredItems;
          const selected = all.splice(0, 20);
          setShowedItems([...showedItems, ...selected]);
          setFilteredItems(all);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>
          {q} {q ? " - " : ""} Search - CSGO ITEMS
        </title>
        <meta
          name="description"
          content={`Results for '${q}' in CSGO ITEMS`}
        />
      </Head>
      <ItemsFilter filter={false} search={search} setSearch={setSearch} />
      <SpinnerLoader loading={loading} />
      <div className="items-grid-small sm:items-grid">
        {showedItems.map((item) => {
          return (
            <ItemCard
              key={item.id}
              route={{ type: getType(item), id: item.id }}
              name={item.name}
              image={item.image}
              rarity={item.rarity}
              showTag={true}
            ></ItemCard>
          );
        })}
      </div>
    </>
  );
}
