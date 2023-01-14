import Link from "next/link";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ResponsiveNavbar({ navigation, closeNavbar }) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto lg:hidden"
      id="lateral-nav"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => closeNavbar(false)}
      ></div>
      <div className="relative bg-white dark:bg-slate-900 w-80 max-w-[calc(100%-3rem)] p-6">
        <button
          type="button"
          className="absolute z-10 flex items-center justify-center w-8 h-8 top-5 right-5 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
          onClick={() => closeNavbar(false)}
        >
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible">
            <path
              d="M0 0L10 10M10 0L0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>

        <nav id="nav" className="relative lg:text-sm lg:leading-6 text-stone-700 dark:text-stone-300">
          <div className="h-screen space-y-2">
            <ul className="flex flex-col space-y-4">
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
                        router.asPath.startsWith(item.href) ? "page" : undefined
                      }
                      onClick={() => closeNavbar(false)}
                    >
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
