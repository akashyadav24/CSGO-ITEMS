import Image from "next/image";

const getRarityColor = (rarity) => {
  const colors = {
    "Consumer Grade": "bg-gray-400",
    "Industrial Grade": "bg-sky-400",
    "Mil-Spec Grade": "bg-blue-400",
    Restricted: "bg-purple-400",
    Classified: "bg-fuchsia-400",
    Covert: "bg-red-400",
    Contraband: "bg-yellow-400",
  };

  return colors[rarity] ?? "bg-slate-200";
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ItemCard({ name, pattern, image, rarity }) {
  return (
    <div className="p-2 rounded-md bg-stone-100">
      <div className="flex justify-end">
        <div
          className={classNames(
            getRarityColor(rarity),
            "w-2.5 h-2.5 rounded-full"
          )}
        ></div>
      </div>
      {/* <img src={image} /> */}
      <Image src={image} width="512" height="384"></Image>
      <div className="text-sm text-center truncate">{name}</div>
    </div>
  );
}
