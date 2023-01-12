import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ItemsFilter({ filter, filterOptions, search, setSearch }) {
  const [dropdown, setDropdown] = useState(false);
  const wrapperRef = useRef("menu");
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef?.current?.contains?.(event.target)
      ) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="flex justify-end mt-10">
      <div className="relative flex max-w-md rounded-md">
        <div className="absolute inset-y-0 flex items-center left-2 text-slate-400">
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
        </div>
        <input
          type="text"
          className={classNames(
            filter ? "border-r-0 rounded-r-none" : "",
            "w-full p-2 pl-10 text-sm border rounded-md outline-none bg-stone-50 border-stone-200 dark:bg-neutral-900 dark:border-stone-800 dark:text-stone-200"
          )}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        {filter && (
          <div
            ref={wrapperRef}
            className="relative flex items-center px-4 border border-l rounded-md rounded-l-none bg-stone-100 border-stone-200 dark:bg-neutral-800 dark:border-stone-800"
          >
            <button
              className="flex items-center"
              onClick={() => setDropdown(!dropdown)}
            >
              <span className="mr-1 text-sm text-gray-700 w-max dark:text-gray-200">{ filterOptions.find(item => item.href === router.asPath)?.name ?? 'Category'}</span>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {dropdown && (
              <div className="absolute right-0 z-40 w-40 py-2 overflow-hidden border rounded-md shadow-lg dark:border-stone-800 bg-stone-50 dark:bg-neutral-900 ring-1 ring-black ring-opacity-5 top-11">
                <ul className="relative text-sm">
                  {filterOptions.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-700 dark:text-stone-200 hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-900"
                    >
                      <Link href={item.href}>
                        <a
                          className={classNames(
                            router.asPath === item.href
                              ? "bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-stone-200"
                              : "",
                            "flex items-center w-full p-1.5"
                          )}
                          onClick={() => setSearch("")}
                        >
                          {item.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
