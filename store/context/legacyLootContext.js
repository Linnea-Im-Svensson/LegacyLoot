import { createContext, useState } from 'react';
import { firebaseDB } from '../../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export const LegacyLootContext = createContext({
  itemList: [],
  loggedInUser: [],
  userAccount: [],
  refresh: true,
  loading: false,
  setLoggedInUser: () => {},
  profileItemList: [],
  setProfileItemList: () => {},
  setUserAccount: () => {},
  setRefresh: () => {},
  getAllItems: () => {},
  setLoading: () => {},
});

const LegacyLootContextProvider = ({ children }) => {
  const [itemList, setItemList] = useState([]);
  const [profileItemList, setProfileItemList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const itemCollectionRef = collection(firebaseDB, 'items');

  const getAllItems = async () => {
    setLoading(true);
    try {
      const data = await getDocs(
        query(itemCollectionRef, orderBy('createdAt', 'desc'))
      );
      setItemList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      console.log(itemList);
    }
  };

  console.log(refresh);

  if (loggedInUser && !userAccount) {
    const getAccount = async () => {
      try {
        const accountCollectionRef = collection(firebaseDB, 'accounts');
        const data = await getDocs(
          query(accountCollectionRef, where('uid', '==', loggedInUser.uid))
        );
        setUserAccount(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        );
      } catch (error) {
        console.log(error);
      }
    };

    getAccount();
  }

  return (
    <LegacyLootContext.Provider
      value={{
        itemList,
        profileItemList,
        loggedInUser,
        userAccount,
        refresh,
        loading,
        setItemList,
        setProfileItemList,
        setLoggedInUser,
        setUserAccount,
        setRefresh,
        getAllItems,
        setLoading,
      }}
    >
      {children}
    </LegacyLootContext.Provider>
  );
};

export default LegacyLootContextProvider;
