import { View, Text } from 'react-native'
import React, { createContext, useEffect, useReducer } from 'react'



const LISTS_INIT = {
  masterList: [
      { text: "Eggs", id: "1", isSelected: true },
      { text: "Milk", id: "2", isSelected: false },
      { text: "Tea Bags", id: "3", isSelected: false },
      { text: "PB", id: "4", isSelected: false },
      { text: "Jam", id: "5", isSelected: false },
      { text: "Beans", id: "6", isSelected: true },
      { text: "Flour", id: "7", isSelected: false },
      { text: "Soap", id: "8", isSelected: false },
      { text: "Shampoo", id: "9", isSelected: false },
      { text: "HandWash", id: "10", isSelected: false },
],
currentList: [],

};

export const ShoppingListContext = createContext(LISTS_INIT);

export const ShoppingListContextReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MASTERLIST_SHOWN_ITEMS":
       const masterListCopy = [...state.masterList];
       let masterList = masterListCopy.find(c => c.id == action.payload.id)
       masterList.isSelected = !action.payload.isSelected;
       return { ...state, masterList: masterListCopy 
       };
    case "UPDATE_CURRENTLIST_SHOWN_ITEMS":

       let currentCopy = [...state.currentList];
       let currentItemUpdated = currentCopy.find(c => c.id == action.payload.id)
       currentItemUpdated.isSelected = !action.payload.isSelected;
       return { ...state, currentList: currentCopy
       };
       
       case "ADD_NEW_ITEM_TO_CURRENT_LIST":
         return {
           ...state,
           currentList: [...state.currentList, action.payload]
      };
       case "ADD_NEW_ITEM_TO_MASTER_LIST":
         return {
           ...state,
           masterList: [...state.masterList, action.payload]
      };
       case "DELETE_CURRENTLIST_ITEM":
        //delete item object sent in payload from item.js
        
        return { ...state, currentList: [...state.currentList].filter(item => item.id != action.payload.id)
        };
       case "DELETE_MASTERLIST_ITEM":
        //delete item object sent in payload from item.js
        
        return { ...state, masterList: [...state.masterList].filter(item => item.id != action.payload.id)
        };

       case "COPY_SELECTED_ITEMS_TO_CURRENT_LIST":
     
       let currentListCopy = [...state.currentList];
        let differenceList = action.payload.filter(obj1 => !currentListCopy.some(obj2 => obj1 === obj2))

        // let temp = [...differenceList].forEach(item => { /////////   Causes all state to change??
        //   item.isSelected= false;
        //   return item;
        // })
        
        return { ...state, currentList: [...state.currentList, ...differenceList]
        };

    default:
      return state;
  }
};

export const ShoppingListContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(
    ShoppingListContextReducer,
    LISTS_INIT
  );
  
  return (
    <ShoppingListContext.Provider
      value={{state, dispatch}}>
     {children}
    </ShoppingListContext.Provider>
  )
}

export default ShoppingListContextProvider