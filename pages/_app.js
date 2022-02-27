import Link from "next/link";
import "../styles/globals.css";

const navigation = [
  { name: "Skins", href: "/skins" },
  { name: "Crates", href: "/crates" },
  { name: "Stickers", href: "/stickers" },
  { name: "Collections", href: "/collections" },
  { name: "Collectibles", href: "/collectibles" },
  { name: "Agents", href: "/agents" },
  { name: "graffiti", href: "/graffiti" },
  { name: "keys", href: "/keys" },
  { name: "patches", href: "/patches" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between py-2 h-14">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <Link href="/">
              <a>CSGO DATA</a>
            </Link>
          </div>
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  "text-slate-500 hover:text-slate-900 px-3 py-2 text-sm font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-7xl">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
