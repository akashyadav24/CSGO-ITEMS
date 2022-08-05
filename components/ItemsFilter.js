import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export default function ItemsFilter({ search, setSearch }) {
  const [dropdown, setDropdown] = useState(false);
  const wrapperRef = useRef("menu");

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef?.current?.contains(event.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className="mt-10 -mb-5">
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
          ref={(input) => {
            input && input.focus();
          }}
          type="text"
          className="w-full p-2 pl-10 border rounded-md outline-none bg-stone-50 border-stone-200"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        {/* <div
          ref={wrapperRef}
          className="relative flex items-center px-4 border border-l rounded-md rounded-l-none bg-stone-100 border-stone-200"
        >
          <button
            className="flex items-center"
            onClick={() => setDropdown(!dropdown)}
          >
            <span className="mr-1 text-sm text-gray-700">Category</span>
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
            <div className="absolute right-0 z-50 w-40 py-2 overflow-hidden rounded-md bg-stone-100 top-11">
              <ul className="relative">
                <li className="hover:bg-stone-50">
                  <Link href="">
                    <a
                      className="flex items-center w-full p-2"
                      onClick={() => setSearch("")}
                    >
                      {" "}
                      All{" "}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
