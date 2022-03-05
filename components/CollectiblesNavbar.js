import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "All", href: "/collectibles" },
  { name: "Major", href: "/collectibles/major" },
  { name: "Operation", href: "/collectibles/operation" },
  { name: "Map coins", href: "/collectibles/map_coins" },
  { name: "Pins", href: "/collectibles/pins" },
  { name: "Service medals", href: "/collectibles/service_medals" },
  { name: "Other", href: "/collectibles/other" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CollectiblesNavbar() {
  const router = useRouter();

  return (
    <div className="hidden mt-6 text-sm border-b md:flex border-stone-200/40">
      {navigation.map((item, index) => (
        <Link key={index} href={item.href}>
          <a
            className={classNames(
              router.asPath === item.href
                ? "text-indigo-500 border-indigo-500"
                : "text-stone-500 border-transparent",
              "block px-4 py-3 -mb-px border-b hover:border-indigo-500 hover:text-indigo-500 duration-100"
            )}
          >
            {item.name}
          </a>
        </Link>
      ))}
    </div>
  );
}
