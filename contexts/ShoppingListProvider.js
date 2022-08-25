import { View, Text } from "react-native";
import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LISTS_INIT = {
  masterList: [],
  currentList: [],
};

export const ShoppingListContext = createContext(LISTS_INIT);

export const ShoppingListContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MASTERLIST_SHOWN_ITEMS":
      const masterListCopy = [...state.masterList];
      let masterList = masterListCopy.find((c) => c.id == action.payload.id);
      masterList.isSelected = !action.payload.isSelected;
      return { ...state, masterList: masterListCopy };
    case "UPDATE_CURRENTLIST_SHOWN_ITEMS":
      let currentCopy = [...state.currentList];
      let currentItemUpdated = currentCopy.find(
        (c) => c.id == action.payload.id
      );
      currentItemUpdated.isSelected = !action.payload.isSelected;
      return { ...state, currentList: currentCopy };
    case "ADD_NEW_ITEM_TO_CURRENT_LIST":
      return {
        ...state,
        currentList: [...state.currentList, action.payload],
      };
    case "REORDER_CURRENT_LIST":
      return {
        ...state,
        currentList: action.payload
      };
    case "REORDER_MASTER_LIST":
      return {
        ...state,
        masterList: action.payload
      };
    case "ADD_NEW_ITEM_TO_MASTER_LIST":
      return {
        ...state,
        masterList: [...state.masterList, action.payload],
      };
    case "DELETE_CURRENTLIST_ITEM":
      return {
        ...state,
        currentList: [...state.currentList].filter(
          (item) => item.id != action.payload.id
        ),
      };
    case "DELETE_MASTERLIST_ITEM":
      return {
        ...state,
        masterList: [...state.masterList].filter(
          (item) => item.id != action.payload.id
        ),
      };
    case "COPY_SELECTED_ITEMS_TO_CURRENT_LIST":
      let currentListCopy = [...state.currentList];
      let differenceList = action.payload.filter(
        (obj1) => !currentListCopy.some((obj2) => obj1.id === obj2.id)
      );
      differenceList.forEach((item) => (item.isSelected = false));
      return {
        ...state,
        currentList: [...state.currentList, ...differenceList],
      };
    case "GET_ALL_LOCAL_DATA":
      let newStateLists = {};
      let master = [];
      let current = [];

      newStateLists = action.payload.map((list) => {
        list[0].includes("masterList")
          ? (master = [...JSON.parse(list[1])])
          : (current = [...JSON.parse(list[1])]);
      });
      return { masterList: master, currentList: current, firstLoad: true };
    default:
      return state;
  }
};

export const ShoppingListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ShoppingListContextReducer, LISTS_INIT);

  const saveListsToLocalStorage = async (key, value, emptyList) => {
    try {
      const jsonValue = emptyList ? "[]" : JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      // console.log("Saved to Local", key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllDataFromLocalStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const results = await AsyncStorage.multiGet(keys);
      dispatch({
        type: "GET_ALL_LOCAL_DATA",
        payload: results.length ? results : [],
      });
    } catch (error) {
      console.error(error);
    }
  };

  //future feature
  // const clearAsyncStorage = () => {
  //   AsyncStorage.clear();
  // };

  return (
    <ShoppingListContext.Provider
      value={{
        state,
        dispatch,
        saveListsToLocalStorage,
        getAllDataFromLocalStorage,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
export default ShoppingListContextProvider;
