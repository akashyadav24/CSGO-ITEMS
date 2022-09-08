import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getItemColor(type) {
  const colors = {
    skins: "bg-blue-300",
    crates: "bg-teal-300",
    stickers: "bg-green-300",
    collections: "bg-orange-300",
    collectibles: "bg-yellow-300",
    agents: "bg-red-300",
    graffiti: "bg-pink-300",
    keys: "bg-yellow-300",
    patches: "bg-indigo-300",
    "music-kits": "bg-purple-300",
  };

  return colors[type] || "bg-gray-300";
}

export default function ItemCard({ route, name, image, rarity = "", showTag = false }) {
  return (
    <div className="relative group">
      <div
        className={
          "flex items-center justify-center w-full overflow-hidden bg-gray-200 rounded-md min-h-[20rem] group-hover:opacity-75 lg:h-80"
        }
      >
        {showTag && (
          <div
            className={classNames(
              getItemColor(route.type),
              "absolute top-0 left-0 p-0.5 px-2 m-1 text-xs bg-red-300 text-gray-900 rounded-full"
            )}
          >
            {route.type}
          </div>
        )}
        <div className="px-8">
          <img src={image} alt={name} loading="lazy" decode="async" />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/item/${route?.type}/${route?.id}`}>
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {name}
              </a>
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{rarity}</p>
        </div>
      </div>
    </div>
  );
}
