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
        "Shopping list items must be 2 or more characters...",
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
      <AddNewItemInput
        shoppingItem={shoppingItem}
        handleInputChange={handleInputChange}
        handleItemAdd={handleItemAdd}
      />
      <View style={styles.newItemSectionWrapper}>
        <Text style={styles.newItemLabel}>
          {shoppingItem && `Add item: ${shoppingItem}`}
        </Text>
      </View>
    </>
  );
};

export default AddNewItemSection;

const styles = StyleSheet.create({
  newItemSectionWrapper: {
    marginTop: 10,
  },
  newItemLabel: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
});
