import { createContext, useState } from 'react';

export const LegacyLootContext = createContext({
  itemList: [],
  loggedInUser: [],
  setLoggedInUser: () => {},
  profileItemList: [],
  setProfileItemList: () => {},
});

const LegacyLootContextProvider = ({ children }) => {
  const [itemList, setitemList] = useState([]);
  const [profileItemList, setProfileItemList] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <LegacyLootContext.Provider
      value={{
        itemList,
        profileItemList,
        loggedInUser,
        setitemList,
        setProfileItemList,
        setLoggedInUser,
      }}
    >
      {children}
    </LegacyLootContext.Provider>
  );
};

export default LegacyLootContextProvider;
