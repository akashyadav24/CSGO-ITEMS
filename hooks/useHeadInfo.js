import { useEffect, useState } from "react";

export default function useHeadInfo({ name, description, type, subtype }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const formatName = (string) => {
    return `${string.charAt(0).toUpperCase()}${string
      .slice(1)
      .replace(/[-_]/g, " ")}`;
  };

  const getTitle = () => {
    if (name != null) {
      return `${name} - CSGO ITEMS`;
    }

    if (type != null && subtype != null) {
      return `${formatName(type)} / ${formatName(subtype)} - CSGO ITEMS`;
    }

    if (type != null) {
      return `${formatName(type)} - CSGO ITEMS`;
    }

    return "CSGO ITEMS";
  };

  const getDescription = () => {
    if (description != null) {
      return description;
    }

    if (type != null && subtype != null) {
      return `All ${type} / ${subtype} items in CSGO ITEMS.`;
    }

    if (type != null) {
      return `All ${type} items in CSGO ITEMS.`;
    }

    return "CSGO ITEMS is a website where you can find all the CSGO items, skins, cases, stickers, gloves, music kits, knives, weapons, and more.";
  };

  useEffect(() => {
    setTitle(getTitle());
    setDesc(getDescription());
  }, [name, description, type, subtype]);

  return { title, desc };
}
