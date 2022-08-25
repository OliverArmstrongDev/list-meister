import { useNavigation } from "@react-navigation/native";
import { useState, useContext, useEffect, useRef } from "react";
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
  const {
    state,
    saveListsToLocalStorage,
    getAllDataFromLocalStorage,
    clearAsyncStorage,
  } = useContext(ShoppingListContext);

  useEffect(() => {
    getAllDataFromLocalStorage();
    // clearAsyncStorage(); //future feature
  }, []);

  useEffect(() => {
    state.firstLoad &&
      saveListsToLocalStorage(
        "currentList",
        state.currentList,
        !state.currentList.length ? true : false
      );
  }, [state.currentList, state.firstLoad]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Master List")}
           > 
            <Text style={styles.buttonText}>
              Choose item(s) from Master List
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonAddInputWrapper}>
            <TouchableOpacity
              style={styles.addNewLabelWrapper}
              onPress={() => setShowAddNewInput(!showAddNewInput)}
            >
              <Text style={styles.addNewLabelText}>
                {showAddNewInput ? "Done" : "Add one-off item to Current List"}
              </Text>
              {!showAddNewInput && (
                <FontAwesome name="plus" size={22} color="white" />
              )}
            </TouchableOpacity>
          </View>
          {/* Add items section */}
        {showAddNewInput && (
          <AddNewItemSection
            setShowAddNewInput={setShowAddNewInput}
            isMaster={false}
          />
        )}
        </View>

        
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
  header: {
    width: "100%",
    backgroundColor: "#2466B8",
    marginBottom: 20,
    borderBottomRightRadius:50,
    borderBottomLeftRadius: 50
  },

  addNewLabelText: {
    fontSize: 18,
    color: "white",
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
