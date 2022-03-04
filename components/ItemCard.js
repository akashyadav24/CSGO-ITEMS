import { useState } from "react";

export default function ItemCard({ name, image }) {
  const [skeletonLoader, setSkeletonLoader] = useState(true);

  return (
    <div className="p-2 rounded-md bg-stone-100">
      {skeletonLoader && (
        <div className="py-20 my-2 rounded-md bg-stone-200 animate-pulse"></div>
      )}
      <img
        src={image}
        alt={name}
        loading="lazy"
        decode="async"
        onLoad={() => setSkeletonLoader(false)}
      />
      <div className="text-sm text-center truncate">{name}</div>
    </div>
  );
}
