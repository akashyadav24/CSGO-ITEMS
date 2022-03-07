import Head from "next/head";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import SpinnerLoader from "../components/SpinnerLoader";
import { getKeys } from "../services/csgo";

export default function Keys() {
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const { data } = await getKeys();

        setKeys(data);
        setLoading(false);
      } catch (e) {
        setKeys([]);
        console.error(e);
      }
    }
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>Keys - CSGO ITEMS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SpinnerLoader loading={loading} />
      <div className="items-grid">
        {keys.map((item) => {
          return (
            <ItemCard
              key={item.id}
              name={item.name}
              image={item.image}
            ></ItemCard>
          );
        })}
      </div>
    </>
  );
}
