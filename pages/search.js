import Head from "next/head";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import ItemsFilter from "../components/ItemsFilter";
import SpinnerLoader from "../components/SpinnerLoader";
import { getAllItems } from "../services/csgo";
import Router, { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

function getItemColor(type) {
  const colors = {
    skins: "dark:bg-blue-300 bg-blue-300/50",
    crates: "dark:bg-teal-300 bg-teal-300/50",
    stickers: "dark:bg-green-300 bg-green-300/50",
    collections: "dark:bg-orange-300 bg-orange-300/50",
    collectibles: "dark:bg-yellow-300 bg-yellow-300/50",
    agents: "dark:bg-red-300 bg-red-300/50",
    graffiti: "dark:bg-pink-300 bg-pink-300/50",
    keys: "dark:bg-yellow-300 bg-yellow-300/50",
    patches: "dark:bg-indigo-300 bg-indigo-300/50",
    "music-kits": "dark:bg-purple-300 bg-purple-300/50",
  };

  return colors[type] || "bg-gray-300";
}

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [skins, setSkins] = useState([]);
  const [showedItems, setShowedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState("");
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
    Router.replace(`/search?q=${search}`, `/search?q=${search}`, {
      shallow: true,
    });

    setFilter("");

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

  const filterByType = () => {
    const types = {};

    const words = search.split(" ");

    const filtered = skins.filter((item) => {
      const { name } = item;
      const nameMatch = words.every((word) =>
        name.toLowerCase().includes(word.toLowerCase())
      );

      return nameMatch;
    });

    filtered.forEach((item) => {
      const type = getType(item);
      if (types[type]) {
        types[type]++;
      } else {
        types[type] = 1;
      }
    });

    return Object.entries(types).sort((a, b) => b[1] - a[1]);
  };

  const toggleType = (type) => {
    if (filter === type) {
      setFilter("");
    } else {
      setFilter(type);
    }
  };

  useEffect(() => {
    const words = search.split(" ");

    const items = skins.filter((item) => {
      const { name } = item;
      const nameMatch = words.every((word) =>
        name.toLowerCase().includes(word.toLowerCase())
      );

      return nameMatch;
    });

    if (filter !== "") {
      const filtered = items.filter((item) => getType(item) === filter);
      setFilteredItems(filtered);
      setShowedItems(filtered.splice(0, 20));
    } else {
      setFilteredItems(items);
      setShowedItems(items.splice(0, 20));
    }
  }, [filter]);

  return (
    <>
      <Head>
        <title>
          {q} {q ? " - " : ""} Search - CSGO ITEMS
        </title>
        <meta name="description" content={`Results for '${q}' in CSGO ITEMS`} />
      </Head>

      <header className="absolute top-0 w-full h-64 background-grid background-grid--fade-out"></header>

      <div className="relative z-10 px-4 mx-auto lg:px-8 max-w-7xl">
        <ItemsFilter filter={false} search={search} setSearch={setSearch} />

        {filterByType().length > 0 && (
          <div className="pt-5 text-white select-none">
            <div className="flex items-center gap-2 overflow-x-scroll sm:overflow-auto sm:flex-wrap hide-scrollbar">
              {filterByType().map(([type, count], index) => (
                <div
                  key={index}
                  className={classNames(
                    getItemColor(type),
                    filter && filter !== type && "opacity-30 hover:opacity-60",
                    "p-0.5 px-2 text-xs text-gray-900 rounded-full flex items-center gap-1 cursor-pointer flex-shrink-0 transition ease-in-out delay-75"
                  )}
                  onClick={() => toggleType(type)}
                >
                  <div className="">{type}</div>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
      </div>
    </>
  );
}
