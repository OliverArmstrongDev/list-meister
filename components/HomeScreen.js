import { useNavigation } from "@react-navigation/native";
import { useState, useContext, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  TouchableOpacity,
} from "react-native";
import AddNewItemSection from "./AddNewItem/AddNewItemSection";
import ShoppingListSection from "./ShoppingListSection";
import { ShoppingListContext } from "../contexts/ShoppingListProvider";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [showAddNewInput, setShowAddNewInput] = useState(false);
  const { dispatch, state } = useContext(ShoppingListContext);

  useEffect(() => {
    dispatch({
      type: "COPY_SELECTED_ITEMS_TO_CURRENT_LIST",
      payload: [...state.masterList.filter((item) => item.isSelected)],
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Master List")}
          >
            <Text style={styles.buttonText}>Choose item(s) from Master List</Text>
          </Pressable>
        </View>
        <View style={styles.buttonAddInputWrapper}>
          <TouchableOpacity style={styles.addNewLabelWrapper} onPress={() => setShowAddNewInput(!showAddNewInput)}>
            <Text style={styles.addNewLabelText}>{showAddNewInput ? "Done" : "Add one-off item to Current List"}</Text>
           {!showAddNewInput && <FontAwesome name="plus" size={20} color="black" />}
          </TouchableOpacity>
        </View>

        {/* Add items section */}
        {showAddNewInput && <AddNewItemSection setShowAddNewInput={setShowAddNewInput} isMaster={false} />}
        {/* list of current items */}
        <ShoppingListSection listData={state.currentList} isMaster={false} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EA",
    alignItems: "center",
  },

  addNewLabelText: {
    fontSize: 18,
    color: "blue",
    paddingRight: 10,
  },
  listWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#000",
  },
  newItemLabelWrapper: {
    marginTop: 10,
  },
  showMaster: {
    fontSize: 17,
    marginVertical: 10,
  },
  newItemLabel: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  newItemInput: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 300,
    borderRadius: 15,
  },
  addNewLabelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAddInputWrapper: {
    marginBottom: 22,
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 19,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginVertical: 25
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
