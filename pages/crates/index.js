import Head from "next/head";
import { useEffect, useState } from "react";
import CratesNavbar from "../../components/CratesNavbar";
import ItemCard from "../../components/ItemCard";
import ItemsFilter from "../../components/ItemsFilter";
import SpinnerLoader from "../../components/SpinnerLoader";
import { getCrates } from "../../services/csgo";

const navigation = [
  { name: "All", href: "/crates" },
  { name: "Cases", href: "/crates/cases" },
  { name: "Capsules", href: "/crates/capsules" },
  { name: "Graffiti", href: "/crates/graffiti" },
  { name: "Music kit", href: "/crates/music_kit_boxes" },
  { name: "Souvenir", href: "/crates/souvenir" },
  { name: "Other", href: "/crates/other" },
];

export default function Crates() {
  const [loading, setLoading] = useState(false);
  const [crates, setCrates] = useState([]);
  const [showedItems, setShowedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const data = await getCrates().then((response) => {
          return response.data.sort((a, b) => a.type?.localeCompare(b.type));
        });

        setCrates([...data]);
        setShowedItems(data.splice(0, 20));
        setFilteredItems(data);
        setLoading(false);
      } catch (e) {
        setCrates([]);
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

  useEffect(() => {
    const filtered = crates.filter((item) => {
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
          setFilteredItems(all);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Crates / All - CSGO ITEMS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ItemsFilter filter={true} filterOptions={navigation} search={search} setSearch={setSearch} />
      {/* <CratesNavbar /> */}
      <SpinnerLoader loading={loading} />
      <div className="items-grid">
        {showedItems.map((item) => (
          <ItemCard
            key={item.id}
            route={{ type: "crates", id: item.id }}
            name={item.name}
            image={item.image}
          ></ItemCard>
        ))}
      </div>
    </>
  );
}
