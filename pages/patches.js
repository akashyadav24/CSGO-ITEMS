import Head from "next/head";
import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import SpinnerLoader from "../components/SpinnerLoader";
import { getPatches } from "../services/csgo";

export default function Patches() {
  const [loading, setLoading] = useState(false);
  const [patches, setPatches] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const { data } = await getPatches();

        setPatches(data);
        setLoading(false);
      } catch (e) {
        setPatches([]);
        console.error(e);
      }
    }
    getData();
  }, []);
  return (
    <>
      <Head>
        <title>Patches - CSGO DATA</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SpinnerLoader loading={loading} />
      <div className="grid w-full gap-1 py-10 mx-auto items-grid-small md:items-grid">
        {patches.map((item) => {
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
