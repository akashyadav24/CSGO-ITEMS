import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllItems } from "../services/csgo";

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

export default function CommandPalette({ openPalette, togglePalette }) {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (openPalette) {
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
        console.error(e);
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
      .slice(0, 50);

    setFilteredItems(filteredItems);
  }, [search, items]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        togglePalette(true);
      }
    });
  }, [togglePalette]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        togglePalette(false);
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
              onClick={() => togglePalette(false)}
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
              <div className="relative w-full overflow-hidden bg-white rounded-md shadow-2xl">
                <div className="p-2">
                  <input
                    ref={(input) => {
                      input && input.focus();
                    }}
                    type="text"
                    className="w-full p-2 rounded-md outline-none bg-stone-100"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  ></input>
                </div>
                <div className="px-2 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-20rem)] hide-scrollbar">
                  {search === "" && (
                    <div className="py-3 text-center"> No recent searches</div>
                  )}
                  {search && filteredItems.length === 0 && (
                    <div className="py-3 text-center">
                      {" "}
                      No results for &quot;{search}&quot;
                    </div>
                  )}
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="w-full rounded-md hover:bg-stone-200"
                    >
                      <Link
                        href="/item/[type]/[id]"
                        as={`/item/${getType(item.id)}/${item.id}`}
                      >
                        <a
                          className="block p-2"
                          onClick={() => togglePalette(false)}
                        >
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 mr-2"
                            />
                            <div>
                              <div className="text-sm font-bold">
                                {item.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.rarity}
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
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
