import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext,  useState } from "react";
import { ShoppingListContext } from "../contexts/ShoppingListProvider";

const Item = ({ item, isMaster, isSelected }) => {
  const [checked, setChecked] = useState(isSelected);
  const { dispatch} = useContext(ShoppingListContext);

  const handleChecked =  (e) => {
    setChecked(!checked);
    isMaster
      ?  dispatch({ type: "UPDATE_MASTERLIST_SHOWN_ITEMS", payload: e })
      :  dispatch({ type: "UPDATE_CURRENTLIST_SHOWN_ITEMS", payload: e });
  };
  
  const handleDeleteShoppingListItem =  (item) => {
    isMaster
      ?  dispatch({ type: "DELETE_MASTERLIST_ITEM", payload: item })
      :  dispatch({ type: "DELETE_CURRENTLIST_ITEM", payload: item });
  };

  return (
    <View style={styles.listItem}>
      <View style={styles.listItemLeft}>
        <TouchableOpacity onPress={() => handleChecked(item)}>
          {checked ? (
            <FontAwesome name="check-square-o" size={34} color="green" />
          ) : (
            <FontAwesome name="square-o" size={34} color="black" />
          )}
        </TouchableOpacity>
      <MaterialCommunityIcons style={checked ? styles.dragHandleChecked : styles.dragHandle } name="drag-horizontal" size={24} color="#737574" />
      </View>
      <Text
        style={[styles.listItemText, !isMaster && checked && styles.checked]}
      >
        {item.text}
      </Text>
      <View>
        <TouchableOpacity onPress={() => handleDeleteShoppingListItem(item)}>
          <MaterialIcons name="delete" size={33} color="black" />
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
  dragHandle: {
   marginLeft:25,
   marginRight: -50,
  },
  dragHandleChecked: {
   marginLeft:23,
   marginRight: -50,
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  checked: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontWeight:"500",
    fontStyle: "italic",
    opacity:0.5,
  },

  listItemText: {
    maxWidth: "80%",
    fontSize: 18,
    fontWeight: "700",
    color: "#2466B8",
  },
  
});
