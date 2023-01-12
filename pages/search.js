import Head from "next/head";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import ItemsFilter from "../components/ItemsFilter";
import SpinnerLoader from "../components/SpinnerLoader";
import { getAllItems } from "../services/csgo";
import { useRouter } from "next/router";

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
    skins: "bg-blue-300",
    crates: "bg-teal-300",
    stickers: "bg-green-300",
    collections: "bg-orange-300",
    collectibles: "bg-yellow-300",
    agents: "bg-red-300",
    graffiti: "bg-pink-300",
    keys: "bg-yellow-300",
    patches: "bg-indigo-300",
    "music-kits": "bg-purple-300",
  };

  return colors[type] || "bg-gray-300";
}

export default function Skins() {
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
    history.replaceState({}, null, `/search?q=${search}`);

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
      <ItemsFilter filter={false} search={search} setSearch={setSearch} />

      {filterByType().length > 0 && (
        <div className="pt-5 text-white select-none">
          <div className="flex items-center gap-2 overflow-x-scroll sm:overflow-auto sm:flex-wrap hide-scrollbar">
            {filterByType().map(([type, count], index) => (
              <div
                key={index}
                className={classNames(
                  getItemColor(type),
                  (filter && filter !== type) && "opacity-30",
                  "p-0.5 px-2 text-xs text-gray-900 rounded-full flex items-center gap-1 cursor-pointer flex-shrink-0"
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
    </>
  );
}
