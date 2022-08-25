import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import AddNewItemSection from "./AddNewItem/AddNewItemSection";
import ShoppingListSection from "./ShoppingListSection";
import Divider from "./Divider";
import { ShoppingListContext } from "../contexts/ShoppingListProvider";
import { useNavigation } from "@react-navigation/native";

const MasterList = () => {
  const [showAddNewInput, setShowAddNewInput] = useState(false);
  const { dispatch, state } = useContext(ShoppingListContext);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log('ue', state);
  }, [state]);

  const handleAddSelected = () => {
    dispatch({
      type: "COPY_SELECTED_ITEMS_TO_CURRENT_LIST",
      payload: [...state.masterList.filter((item) => item.isSelected)],
    });
    navigation.navigate("Current List");
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.buttonAddInputWrapper}>
          <TouchableOpacity
            style={styles.addNewLabelWrapper}
            onPress={() => setShowAddNewInput(!showAddNewInput)}
          >
            <Text style={styles.addNewLabelText}>
              {showAddNewInput ? "Done" : "Add new item to Master List"}
            </Text>
            {!showAddNewInput && (
              <FontAwesome name="plus" size={20} color="black" />
            )}
          </TouchableOpacity>
        </View>

        {/* Add items section */}
        {showAddNewInput && <AddNewItemSection setShowAddNewInput={setShowAddNewInput} isMaster={true} />}
        <Divider text="Master List" mb={0} />
        <View style={styles.buttonAddWrapper}>
          <Pressable style={styles.button} onPress={() => handleAddSelected()}>
            <Text style={styles.buttonText}>
              {'Add selected items to "Current List"'}
            </Text>
          </Pressable>
        </View>
        {/* list of current items */}
        <ShoppingListSection
          // updateList={setMasterShoppingList}
          listData={state.masterList}
          isMaster={true}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MasterList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EA",
    alignItems: "center",
  },
  buttonAddWrapper: {
    marginBottom: 15,
  },
  buttonAddInputWrapper: {
    marginTop: 35,
    marginBottom: 18,
    width: "100%",
  },
  addNewLabelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addNewLabelText: {
    fontSize: 18,
    color: "blue",
    paddingRight: 10,
  },
  buttonAddSelected: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 19,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginVertical: 25,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
