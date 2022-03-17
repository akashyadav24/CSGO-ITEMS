// import Image from "next/image";

export default function ItemCard({ route, name, image, rarity = "" }) {
  return (
    <div className="relative group">
      <div
        className={
          "flex items-center justify-center w-full overflow-hidden bg-gray-200 rounded-md min-h-[20rem] group-hover:opacity-75 lg:h-80"
        }
      >
        <div className="px-8">
          <img src={image} alt={name} loading="lazy" decode="async" />
        </div>
        {/* <div className="relative w-full pb-48">
          <Image src={image} alt={name} layout="fill" objectFit="contain" />
        </div> */}
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={`/item/${route?.type}/${route?.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{rarity}</p>
        </div>
        {/* <p className="text-sm font-medium text-gray-900">100</p> */}
        {/* <p className="w-2.5 h-2.5 bg-red-300 rounded-full"></p> */}
      </div>
    </div>
  );
}
