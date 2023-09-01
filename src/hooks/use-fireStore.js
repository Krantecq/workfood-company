import { useEffect, useState } from "react";
import { listenCollectionData } from "../firebase/services/listeners";

const useFireStore = (collectionName, queryList = null) => {
  const [collectionData, setCollectionData] = useState(null);
  const [isDataFetching, setIsDataFetching] = useState(true);

  useEffect(() => {
    const listener = listenCollectionData(
      collectionName,
      (fetchedData) => {
        setCollectionData(fetchedData);
        setIsDataFetching(false);
      },
      queryList
    );
    return () => listener && listener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: collectionData,
    isFetching: isDataFetching,
    dataCount: collectionData ? collectionData.length : 0,
  };
};

export default useFireStore;
