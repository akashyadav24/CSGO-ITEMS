import Link from "next/link";
import { useRouter } from "next/router";

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
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <div className="sticky top-0 z-40 flex-none w-full transition-colors duration-500 bg-white backdrop-blur lg:z-50 lg:border-b lg:border-stone-900/10 bg-stone-50/90 ">
        <div className="mx-auto max-w-7xl">
          <div className="px-4 py-3 border-b border-stone-900/10 lg:px-8 lg:border-0">
            <div className="relative flex items-center">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <Link href="/">
                  <a>CSGO DATA</a>
                </Link>
              </div>
              <div className="relative items-center hidden ml-auto lg:flex">
                <nav className="text-sm font-semibold leading-6 text-stone-700">
                  <ul className="flex space-x-8">
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

              <button className="flex items-center justify-center w-8 h-8 ml-auto -my-1 text-slate-500 hover:text-slate-600 lg:hidden">
                <span className="sr-only">Search</span>
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
              <div className="ml-2 -my-1 lg:hidden">
                <button className="flex items-center justify-center w-8 h-8 text-slate-500 hover:text-slate-600">
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
