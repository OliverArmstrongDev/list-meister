import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import React, {  useContext, useState } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListProvider";

const Item = ({ item, isMaster, isSelected }) => {
  const [checked, setChecked] = useState(isMaster ? isSelected : false);
 const {dispatch} = useContext(ShoppingListContext);
 
//  console.log('item', item);

  const handleChecked = (e) => {
    setChecked(!checked);
    console.log('itemjs e', e);
    isMaster ? dispatch({type: "UPDATE_MASTERLIST_SHOWN_ITEMS", payload: e})
    :
    dispatch({type: "UPDATE_CURRENTLIST_SHOWN_ITEMS", payload: e});

    // updateList(prevState =>
    //   prevState.map(ListItem => {
    //     if (ListItem.id === e.id) {
    //       console.log('obj',ListItem);
    //       console.log('e',e);
    //       return {...ListItem, isShown: checked};
    //     }
    //     return ListItem;
    // }))

  };
  const handleDeleteShoppingListItem = (item) => {
    isMaster ?
     dispatch({type: "DELETE_MASTERLIST_ITEM", payload: item})
     :
     dispatch({type: "DELETE_CURRENTLIST_ITEM", payload: item});
  };

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemLeft}>
        <TouchableOpacity onPress={()=> handleChecked(item)}>
          {checked ? (
              <FontAwesome name="check-square-o" size={30} color="green" />
            ) : (
              <FontAwesome name="square-o" size={30} color="black" />
            )
          }
        </TouchableOpacity>
      </View>
      <Text style={[styles.listItemText, !isMaster && checked && styles.checked]}>
        {item.text}
      </Text>
      <View>
        <TouchableOpacity onPress={() => handleDeleteShoppingListItem(item)}>
          <MaterialIcons name="delete" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    marginVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  checked: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontStyle: "italic",
  },

  listItemText: {
    maxWidth: "80%",
    fontSize: 18,
    fontWeight: "500",
    color: "#EF0FFF",
  },
});
