import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SpinnerLoader from "../../../components/SpinnerLoader";
import { getAllItems } from "../../../services/csgo";

export default function SkinById() {
  const router = useRouter();
  const { type, id } = router.query;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await getAllItems();
        const selectedItem = data[id] || null;

        setItem(selectedItem);
        setLoading(false);
      } catch (e) {
        setItem(null);
      }
    }
    getData();
  }, [id, type]);

  const pageTitle = () => {
    if (item?.name) {
      return `${item?.name} - CSGO ITEMS`;
    }

    return "CSGO ITEMS";
  };

  const pageDescription = () => {
    return item?.description ?? "";
  };

  return (
    <>
      <Head>
        <title>{pageTitle()}</title>
        <meta name="description" content={pageDescription()} />
      </Head>
      <SpinnerLoader loading={loading} />
      {!loading && item !== null ? (
        <div className="grid gap-10 mt-10 lg:grid-cols-7">
          <div
            className={
              "flex lg:col-span-3 items-center justify-center w-full overflow-hidden bg-gray-200 dark:bg-neutral-800 rounded-md min-h-[20rem] lg:min-h-[40rem] group-hover:opacity-75 lg:h-80"
            }
          >
            <div className="px-10 lg:px-20">
              <img
                src={item?.image}
                alt={item?.name}
                loading="lazy"
                decode="async"
              />
            </div>
          </div>
          <div className="w-full lg:col-span-4">
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-stone-50">{item.name}</h1>
              <p className="mt-1 text-lg text-gray-700 dark:text-stone-400">
                {item.rarity ?? "unknown rarity"}
              </p>
            </div>
            <div>
              <p className="mt-1 text-base text-gray-700 dark:text-stone-400">{item.description}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
