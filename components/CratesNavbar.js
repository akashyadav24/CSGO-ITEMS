import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  { name: "All", href: "/crates" },
  { name: "Cases", href: "/crates/cases" },
  { name: "Capsules", href: "/crates/capsules" },
  { name: "Graffiti", href: "/crates/graffiti" },
  { name: "Music kit", href: "/crates/music_kit_boxes" },
  { name: "Souvenir", href: "/crates/souvenir" },
  { name: "Other", href: "/crates/other" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CratesNavbar() {
  const router = useRouter();

  return (
    <div className="hidden mt-6 text-sm border-b md:flex border-stone-200/40">
      {navigation.map((item, index) => (
        <Link key={index} href={item.href}>
          <a
            className={classNames(
              router.asPath === item.href
                ? "text-indigo-400 border-indigo-400"
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
