import { createContext, useState } from 'react';
import { firebaseDB } from '../../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export const LegacyLootContext = createContext({
  itemList: [],
  loggedInUser: [],
  userAccount: [],
  refresh: true,
  loading: false,
  image: '',
  upImage: '',
  setLoggedInUser: () => {},
  profileItemList: [],
  setProfileItemList: () => {},
  setUserAccount: () => {},
  setRefresh: () => {},
  getAllItems: () => {},
  setLoading: () => {},
  setImage: () => {},
  setUpImage: () => {},
});

const LegacyLootContextProvider = ({ children }) => {
  const [itemList, setItemList] = useState([]);
  const [profileItemList, setProfileItemList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const itemCollectionRef = collection(firebaseDB, 'items');
  const [image, setImage] = useState(null);
  const [upImage, setUpImage] = useState('');
  // console.log('upimage: ', upImage);

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
        image,
        upImage,
        setItemList,
        setProfileItemList,
        setLoggedInUser,
        setUserAccount,
        setRefresh,
        getAllItems,
        setLoading,
        setImage,
        setUpImage,
      }}
    >
      {children}
    </LegacyLootContext.Provider>
  );
};

export default LegacyLootContextProvider;
