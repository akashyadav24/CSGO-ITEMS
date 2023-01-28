import { useEffect, useState } from "react";

export default function useInfiniteScroll(callback) {
  const [isFetching, setIsFetching] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isFinished) {
        window.removeEventListener("scroll", handleScroll);
        return;
      }

      if (isFetching) return;
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        setIsFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (isFinished || !isFetching) return;
    callback();
  }, [isFetching]);

  return { isFetching, setIsFetching, isFinished, setIsFinished };
}
