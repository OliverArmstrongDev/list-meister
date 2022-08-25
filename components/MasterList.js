import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback
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
  const { dispatch, state, saveListsToLocalStorage } = useContext(ShoppingListContext);
  const navigation = useNavigation();

  useEffect(()=> {
    state.firstLoad && saveListsToLocalStorage("masterList", state.masterList, !state.masterList.length? true : false);
    },[state.masterList, state.firstLoad]);

  const handleAddSelected = async () => {
    await dispatch({
      type: "COPY_SELECTED_ITEMS_TO_CURRENT_LIST",
      payload: [...state.masterList.filter((item) => item.isSelected)],
    });
    //go back to home screen
    navigation.navigate("Current List");
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
      <View style={styles.header}>
        {/* <Divider text="Master List" mb={0} /> */}
        <View style={styles.buttonAddWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => handleAddSelected()}>
            <Text style={styles.buttonText}>
              {'Add selected to "Current List"'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonAddInputWrapper}>
          <TouchableOpacity
            style={styles.addNewLabelWrapper}
            onPress={() => setShowAddNewInput(!showAddNewInput)}
          >
            <Text style={styles.addNewLabelText}>
              {showAddNewInput ? "Done" : "Add new item to Master List"}
            </Text>
            {!showAddNewInput && (
              <FontAwesome name="plus" size={22} color="white" />
            )}
          </TouchableOpacity>
        </View>
        {/* Add items section */}
        {showAddNewInput && <AddNewItemSection setShowAddNewInput={setShowAddNewInput} isMaster={true} />}
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
  header: {
    width: "100%",
    backgroundColor: "#2466B8",
    marginBottom: 20,
    borderBottomRightRadius:50,
    borderBottomLeftRadius: 50
  },
  buttonAddWrapper: {
    // marginBottom: 15,
  },
  buttonAddInputWrapper: {
    // marginTop: 35,
    marginBottom: 28,
    width: "100%",
  },
  addNewLabelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addNewLabelText: {
    fontSize: 18,
    color: "white",
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
    backgroundColor: "#E5E7EA",
    marginVertical: 25,
    marginHorizontal: 40,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 9,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});
