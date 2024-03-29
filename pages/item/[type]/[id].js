import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import SpinnerLoader from "../../../components/SpinnerLoader";
import CustomChart from "../../../components/Chart";
import useHeadInfo from "../../../hooks/useHeadInfo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SkinById() {
  const router = useRouter();
  const { type, id } = router.query;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceHistory, setPriceHistory] = useState(null);
  const [options, setOptions] = useState("30d");

  const { title, desc } = useHeadInfo({
    name: item?.name,
    description: item?.description,
  });

  const optionsList = [
    {
      name: "All",
      value: "All",
      color: "bg-indigo-400/40 dark:bg-indigo-400 text-indigo-600 font-bold",
    },
    {
      name: "30d",
      value: "30d",
      color: "bg-indigo-400/40 dark:bg-indigo-400 text-indigo-600 font-bold",
    },
  ];

  const formatOptions = (chartData) => {
    return {
      chart: {
        type: "line",
        fontFamily: "inherit",
        sparkline: {
          enabled: true,
        },
        animations: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: [0.25, 1],
        type: ["solid", "solid"],
      },
      stroke: {
        width: [1, 2],
        lineCap: "round",
        curve: "smooth",
      },
      series: [
        {
          type: "area",
          name: "Volume",
          data: chartData.map((i) => i.volume),
        },
        {
          type: "line",
          name: "Price",
          data: chartData.map((i) => i.value),
        },
      ],
      grid: {
        strokeDashArray: 4,
        padding: {
          top: 10,
        },
      },
      xaxis: {
        labels: {
          padding: 0,
        },
        tooltip: {
          enabled: false,
        },
        axisBorder: {
          show: false,
        },
        // type: "datetime",
      },
      yaxis: [
        {
          // opposite: true,
          title: {
            text: "Volume",
          },
          labels: {
            padding: 4,
            formatter: function (value) {
              return parseFloat(value);
            },
          },
        },
        {
          title: {
            text: "Price",
          },
          labels: {
            padding: 4,
            formatter: function (value) {
              return value + " $";
            },
          },
        },
      ],
      colors: ["#fb7185", "#818cf8"],
      labels: chartData.map((i) => i.time),
      legend: {
        show: false,
      },
      point: {
        show: false,
      },
    };
  };

  const filterPriceHistory = () => {
    if (priceHistory != null) {
      if (options === "All") {
        return formatOptions(priceHistory);
      }

      return formatOptions(priceHistory.slice(-30));
    }

    return formatOptions([]);
  };

  const getPriceHistory = useMemo(
    () => filterPriceHistory(),
    [options, priceHistory]
  );

  useEffect(() => {
    async function getData() {
      const data = await axios.get("/api/items").then((res) => res.data);
      const selectedItem = data[id] || null;

      setItem(selectedItem);
      setLoading(false);
    }
    getData();
  }, [id, type]);

  useEffect(() => {
    async function fetchPriceHistory() {
      try {
        let priceHistory = await axios
          .get(`/api/price_history/`, {
            params: { name: item.name },
          })
          .then((r) => r.data);

        setPriceHistory(priceHistory);
      } catch (e) {
        setPriceHistory([]);
      }
    }

    if (item?.id != null) {
      fetchPriceHistory();
    }
  }, [item]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Head>

      <header className="absolute top-0 w-full h-64 background-grid background-grid--fade-out"></header>

      <div className="relative z-10 px-4 mx-auto lg:px-8 max-w-7xl">
        <SpinnerLoader loading={loading} />

        {!loading && item === null ? (
          <div className="flex flex-col items-center justify-center w-full h-full mt-20">
            <h1 className="text-xl font-bold text-center text-gray-800 dark:text-white">
              Item not found
            </h1>
          </div>
        ) : null}

        {!loading && item !== null ? (
          <>
            <div className="grid gap-10 mt-10 lg:grid-cols-7">
              <div
                className={
                  "flex lg:col-span-3 items-center justify-center w-full overflow-hidden bg-gray-200 dark:bg-slate-800 rounded-md min-h-[20rem] lg:min-h-[40rem] group-hover:opacity-75 lg:h-80"
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
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-stone-50">
                    {item.name}
                  </h1>
                </div>
                <div>
                  <p className="mt-1 text-base text-gray-700 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>

            {priceHistory?.length > 0 ? (
              <div className="mt-20 mb-20">
                <div className="flex flex-col justify-between mb-2 overflow-hidden sm:flex-row">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-stone-50">
                    Median Sale Prices on Steam
                  </h3>
                  <div className="text-white select-none">
                    <div className="flex items-center justify-end gap-2">
                      {optionsList.map((option) => {
                        return (
                          <button
                            key={option.value}
                            type="button"
                            className={classNames(
                              option.color,
                              options !== option.value &&
                                "opacity-30 hover:opacity-60",
                              "p-1 px-3 text-xs text-gray-900 rounded-md flex items-center gap-1 cursor-pointer flex-shrink-0 transition ease-in-out delay-75"
                            )}
                            onClick={() => setOptions(option.value)}
                          >
                            {option.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-md dark:border-slate-800/50">
                  <CustomChart options={getPriceHistory} />
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}
