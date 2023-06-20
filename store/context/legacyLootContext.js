import { createContext, useState } from 'react';
import { firebaseDB } from '../../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export const LegacyLootContext = createContext({
  itemList: [],
  loggedInUser: [],
  userAccount: [],
  refresh: true,
  profileRefresh: false,
  loading: false,
  image: '',
  upImage: '',
  bookmarkItems: [],
  setLoggedInUser: () => {},
  profileItemList: [],
  setProfileItemList: () => {},
  setUserAccount: () => {},
  setRefresh: () => {},
  setProfileRefresh: () => {},
  getAllItems: () => {},
  setLoading: () => {},
  setImage: () => {},
  setUpImage: () => {},
  getProfileItems: () => {},
  getAccount: () => {},
  setBookMarkItems: () => {},
});

const LegacyLootContextProvider = ({ children }) => {
  const [itemList, setItemList] = useState([]);
  const [profileItemList, setProfileItemList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [profileRefresh, setProfileRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const itemCollectionRef = collection(firebaseDB, 'items');
  const [image, setImage] = useState(null);
  const [upImage, setUpImage] = useState('');
  const [bookmarkItems, setBookMarkItems] = useState([]);

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
    }
  };

  const profileItemCollectionRef = collection(firebaseDB, 'items');
  const getProfileItems = async () => {
    try {
      const data = await getDocs(
        query(
          profileItemCollectionRef,
          orderBy('createdAt', 'desc'),
          where('uid', '==', userAccount.uid)
        )
      );
      setProfileItemList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAccount = async () => {
    try {
      const accountCollectionRef = collection(firebaseDB, 'accounts');
      const data = await getDocs(
        query(accountCollectionRef, where('uid', '==', loggedInUser.uid))
      );
      setUserAccount(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
      );
      setBookMarkItems(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].savedItems
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedInUser && !userAccount) {
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
        profileRefresh,
        loading,
        image,
        upImage,
        bookmarkItems,
        setItemList,
        setProfileItemList,
        setLoggedInUser,
        setUserAccount,
        setRefresh,
        setProfileRefresh,
        getAllItems,
        setLoading,
        setImage,
        setUpImage,
        getProfileItems,
        getAccount,
        setBookMarkItems,
      }}
    >
      {children}
    </LegacyLootContext.Provider>
  );
};

export default LegacyLootContextProvider;
