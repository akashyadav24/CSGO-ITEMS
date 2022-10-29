import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ResponsiveNavbar from "./ResponsiveNavbar";

const navigation = [
  { name: "Skins", href: "/skins" },
  { name: "Crates", href: "/crates" },
  { name: "Stickers", href: "/stickers" },
  { name: "Collections", href: "/collections" },
  { name: "Collectibles", href: "/collectibles" },
  { name: "Agents", href: "/agents" },
  { name: "Graffiti", href: "/graffiti" },
  { name: "Keys", href: "/keys" },
  { name: "Patches", href: "/patches" },
  { name: "Music", href: "/music-kits" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ openPalette, togglePalette }) {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    if (showNavbar) {
      document.body.classList.add("overflow-hidden");
      document.body.classList.add("lg:overflow-auto");
      return;
    }

    document.body.classList.remove("overflow-hidden");
    document.body.classList.remove("lg:overflow-auto");
  }, [showNavbar]);

  return (
    <>
      {showNavbar && (
        <ResponsiveNavbar navigation={navigation} closeNavbar={setShowNavbar} />
      )}
      <div className="sticky top-0 z-40 flex-none w-full transition-colors duration-500 bg-white backdrop-blur lg:z-50 lg:border-b lg:border-stone-900/10 bg-stone-50/90 ">
        <div className="mx-auto max-w-7xl">
          <div className="px-4 py-3 border-b border-stone-900/10 lg:px-8 lg:border-0">
            <div className="relative flex items-center">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                <Link href="/">
                  <a>CSGO ITEMS</a>
                </Link>
              </div>

              <div className="relative flex ml-auto space-x-3 pointer-events-auto">
                <button
                  type="button"
                  className="items-center hidden lg:flex text-slate-400 hover:text-slate-500"
                  onClick={() => togglePalette(true)}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    aria-hidden="true"
                    className="flex-none"
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
                <Link href="https://github.com/ByMykel/CSGO-ITEMS">
                  <a
                    className="items-center hidden lg:flex text-slate-400 hover:text-slate-500"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="w-5 h-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </a>
                </Link>
              </div>

              <div className="relative items-center hidden ml-auto lg:flex">
                <nav className="text-sm font-semibold leading-6 text-stone-700">
                  <ul className="flex space-x-6 xl:space-x-8">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link href={item.href}>
                          <a
                            className={classNames(
                              router.asPath.startsWith(item.href)
                                ? "text-indigo-400"
                                : "",
                              "hover:text-indigo-500 duration-100"
                            )}
                            aria-current={
                              router.asPath.startsWith(item.href)
                                ? "page"
                                : undefined
                            }
                          >
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 ml-auto -my-1 text-slate-400 hover:text-slate-500 lg:hidden"
                onClick={() => togglePalette(true)}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m19 19-3.5-3.5"></path>
                  <circle cx="11" cy="11" r="6"></circle>
                </svg>
              </button>
              <Link href="https://github.com/ByMykel/CSGO-ITEMS">
                <a
                  className="flex items-center ml-2 lg:hidden text-slate-400 hover:text-slate-500"
                  target="_blank"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
              </Link>
              <div className="ml-4 -my-1 lg:hidden">
                <button
                  type="button"
                  className="flex items-center justify-center w-8 h-8 text-slate-500 hover:text-slate-600"
                  onClick={() => setShowNavbar(true)}
                >
                  <svg width="24" height="24">
                    <path
                      d="M5 6h14M5 12h14M5 18h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
