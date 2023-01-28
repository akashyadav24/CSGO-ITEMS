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
import useHeadInfo from "../../hooks/useHeadInfo";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

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
  const [search, setSearch] = useState("");

  const getKey = (pageIndex, previousPageData) => {
    if (type == null) return;
    if (previousPageData && !previousPageData.length) return null;

    return (
      `/api/items?page=${pageIndex + 1}&type=${type}` +
      (search ? `&q=${search}` : "")
    );
  };

  const { data, size, setSize, isLoading } = useSWRInfinite(
    mounted ? getKey : null,
    fetcher,
    { revalidateFirstPage: false }
  );

  useEffect(() => {
    setMounted(true);
    setSearch("");
  }, [type]);

  const { isFetching, setIsFetching, setIsFinished } = useInfiniteScroll(() =>
    setSize(size + 1)
  );

  useEffect(() => {
    if (data?.[data?.length - 1].length === 0) setIsFinished(true);
    setIsFetching(false);
  }, [data]);

  const { title, desc } = useHeadInfo({ type });

  if (mounted && type && !isValidType(type)) {
    return <Custom404 />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Head>

      <header className="absolute top-0 w-full h-64 background-grid background-grid--fade-out"></header>

      <div className="px-4 mx-auto lg:px-8 max-w-7xl">
        <ItemsFilter
          filter={Constants.FILTER_OPTIONS_AVAILABLE[type]}
          filterOptions={Constants.NAVIGATION[type]}
          search={search}
          setSearch={setSearch}
        />
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
        <SpinnerLoader loading={isFetching} />
      </div>
    </>
  );
}
