import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllItems } from "../services/csgo";
import { useRouter } from "next/router";

const getType = (id) => {
  const types = {
    skin: "skins",
    crate: "crates",
    sticker: "stickers",
    collection: "collections",
    collectible: "collectibles",
    agent: "agents",
    graffiti: "graffiti",
    key: "keys",
    patch: "patches",
    "music-kit": "music-kits",
  };

  return types[id.split("-").slice(0, -1).join("-")];
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CommandPalette({ openPalette, togglePalette }) {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [items, setItems] = useState([]);
  const router = useRouter();

  const handleButtonSearch = () => {
    togglePalette(false);
    router.push("/search?q=" + search);
    setSearch("");
  };

  const leavePalette = () => {
    togglePalette(false);
    setSearch("");
  };

  useEffect(() => {
    if (openPalette) {
      setSearch("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openPalette]);

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await getAllItems();

        setItems(Object.values(data));
      } catch (e) {
        setItems([]);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredItems([]);
      return;
    }

    const words = search.split(" ");

    const filteredItems = items
      .filter((item) => {
        const { name } = item;
        const nameMatch = words.every((word) =>
          name.toLowerCase().includes(word.toLowerCase())
        );
        return nameMatch;
      })
      .slice(0, 5);

    setFilteredItems(filteredItems);
  }, [search, items]);

  useEffect(() => {
    function handleKeyEvent(e) {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        togglePalette(true);
      }
    }
    document.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  }, [togglePalette]);

  useEffect(() => {
    function handleEnterKey(e) {
      if (!openPalette) return;
      if (e.key === "Enter") {
        e.preventDefault();
        togglePalette(false);
        router.push("/search?q=" + search);
        setSearch("");
      }
      if (e.key === 13) {
        e.preventDefault();
        togglePalette(false);
        router.push("/search?q=" + search);
        setSearch("");
      }
    }
    document.addEventListener("keydown", handleEnterKey);
    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, [togglePalette, search]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        togglePalette(false);
        setSearch("");
      }
    });
  }, [togglePalette]);

  return (
    <>
      {openPalette && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
            style={{ fontSize: 0 }}
          >
            <div
              className="fixed inset-0 block transition-opacity bg-black bg-opacity-20 backdrop-blur-sm backdrop-filter"
              aria-hidden="true"
              onClick={() => leavePalette()}
            ></div>

            {/* <span
              className="hidden md:inline-block md:align-middle md:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span> */}

            <span className="block py-10"></span>

            <div
              className="inline-block w-full m-6 text-base text-left transition transform h-min md:m-0 md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="relative w-full overflow-hidden bg-white rounded-md shadow-2xl dark:bg-slate-800">
                <div className="relative p-2">
                  <button
                    type="button"
                    className="absolute text-gray-400 top-[15px] left-3"
                    onClick={() => handleButtonSearch()}
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      aria-hidden="true"
                      className="flex-none mr-3"
                    >
                      <path
                        d="m19 19-3.5-3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <circle
                        cx="11"
                        cy="11"
                        r="6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></circle>
                    </svg>
                  </button>
                  <input
                    ref={(input) => {
                      setTimeout(() => {
                        input && input.focus();
                      }, 100);
                    }}
                    type="text"
                    className="w-full p-2 bg-gray-100 rounded-md outline-none pl-9 dark:bg-slate-900 dark:text-stone-200"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  ></input>
                </div>
                <div
                  className={classNames(
                    search.length === 0 ? "hidden" : "",
                    "px-2 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-16rem)] md:max-h-[calc(100vh-20rem)] hide-scrollbar"
                  )}
                >
                  {search && filteredItems.length === 0 && (
                    <div className="py-3 text-center dark:text-stone-50">
                      {" "}
                      No results for &quot;{search}&quot;
                    </div>
                  )}
                  {filteredItems.map((item) => (
                    <Link
                      key={item.id}
                      href="/item/[type]/[id]"
                      as={`/item/${getType(item.id)}/${item.id}`}
                    >
                      <a
                        className="block w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-slate-900 focus:bg-gray-50 dark:focus:bg-slate-900"
                        onClick={() => leavePalette()}
                      >
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 mr-2"
                          />
                          <div>
                            <div className="text-sm font-bold dark:text-stone-50">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-slate-300">
                              {item.rarity}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
