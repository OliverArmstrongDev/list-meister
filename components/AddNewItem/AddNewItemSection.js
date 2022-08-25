import { StyleSheet, Text, View, Keyboard, Alert } from "react-native";
import React, { useContext, useState } from "react";
import AddNewItemInput from "./AddNewItemInput";
import { ShoppingListContext } from "../../contexts/ShoppingListProvider";

const AddNewItemSection = ({isMaster, setShowAddNewInput}) => {

  const [shoppingItem, setShoppingItem] = useState();
  const { dispatch, state } = useContext(ShoppingListContext);

  const handleItemAdd = (text) => {
    if (!shoppingItem || text.length <= 1) {
      Alert.alert(
        "Can't add item!",
        "List items must be 2 or more characters...",
        [{ text: "Understood" }]
      );
      return;
    }
    Keyboard.dismiss();
    isMaster ?
    dispatch({type: "ADD_NEW_ITEM_TO_MASTER_LIST", payload: { text, id: Math.random().toString(), isSelected: false } })
    :
    dispatch({type: "ADD_NEW_ITEM_TO_CURRENT_LIST", payload: { text, id: Math.random().toString(), isSelected: false } });

    setShoppingItem(null);
    setShowAddNewInput(false);
  };

  const handleInputChange = (text) => {
    setShoppingItem(text);
  };

  return (
    <>
      
      <View style={styles.newItemSectionWrapper}>
      <AddNewItemInput
        shoppingItem={shoppingItem}
        handleInputChange={handleInputChange}
        handleItemAdd={handleItemAdd}
      />
      </View>
    </>
  );
};

export default AddNewItemSection;

const styles = StyleSheet.create({
  newItemSectionWrapper: {
    marginBottom: 20,
  },
});
