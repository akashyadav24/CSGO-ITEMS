import axios from "axios";
import useSWRInfinite from "swr/infinite";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ItemCard from "../../components/ItemCard";
import ItemsFilter from "../../components/ItemsFilter";
import SpinnerLoader from "../../components/SpinnerLoader";
import Custom404 from "../404";
import * as Constants from "../../utils/constants";

const isValidType = (type) => {
  return Constants.URL[type] !== undefined;
};

const fetcher = (url) =>
  axios.get(url).then((res) => {
    return res.data;
  });

export default function Skins() {
  const router = useRouter();
  const { type } = router.query;

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getKey = (pageIndex, previousPageData) => {
    if (type == null) return;
    if (previousPageData && !previousPageData.length) return null;

    return (
      `${Constants.URL[type]}?page=${pageIndex + 1}` +
      (search ? `&q=${search}` : "")
    );
  };

  const { data, size, setSize } = useSWRInfinite(
    mounted ? getKey : null,
    fetcher,
    { revalidateFirstPage: false }
  );

  useEffect(() => {
    setMounted(true);
    setSearch("");
  }, [type]);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const lastItemLoaded =
      document.querySelector(".items-grid > .group:last-child") ||
      document.querySelector(".items-grid-small > .group:last-child");
    if (lastItemLoaded) {
      const lastItemLoadedOffset =
        lastItemLoaded.offsetTop + lastItemLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight + 400;

      if (pageOffset > lastItemLoadedOffset && loading === false) {
        setLoading(true);
        setSize(size + 1);
      }
    }
  };

  const formatName = (name) => {
    return `${name.charAt(0).toUpperCase()}${name
      .slice(1)
      .replace(/[-_]/g, " ")}`;
  };

  const pageTitle = () => {
    if (type) {
      return `${formatName(type)} - CSGO ITEMS`;
    }

    return "CSGO ITEMS";
  };

  if (mounted && !isValidType(type)) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>{pageTitle()}</title>
        <meta
          name="description"
          content={`List of ${type} items in CSGO ITEMS`}
        />
      </Head>

      <header className="absolute top-0 w-full h-64 background-grid background-grid--fade-out"></header>

      <div className="px-4 mx-auto lg:px-8 max-w-7xl">
        <ItemsFilter
          filter={Constants.FILTER_OPTIONS_AVAILABLE[type]}
          filterOptions={Constants.NAVIGATION[type]}
          search={search}
          setSearch={setSearch}
        />
        <SpinnerLoader loading={!data} />
        <div className="items-grid-small sm:items-grid">
          {data
            ? data?.map((items, index) => {
                return (
                  Array.isArray(items) &&
                  items.map((item) => (
                    <ItemCard
                      key={item.id}
                      route={{ type: type, id: item.id }}
                      name={item.name}
                      image={item.image}
                      rarity={item.rarity}
                    ></ItemCard>
                  ))
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
