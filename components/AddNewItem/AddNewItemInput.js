import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';

const AddNewItemInput = ({
  shoppingItem,
  handleInputChange,
  handleItemAdd,
}) => {
  return (
    <View style={styles.addItemWrapper}>
      <TextInput
        style={styles.newItemInput}
        placeholder={"Add a new item..."}
        value={shoppingItem}
        onChangeText={handleInputChange}
        onSubmitEditing={()=> handleItemAdd(shoppingItem)}
      />
      <TouchableOpacity onPress={() => handleItemAdd(shoppingItem)}>
        <View style={styles.addItemButtonWrapper}>
          <Text style={styles.addItemButtonText}>
            <FontAwesome name="plus" size={24} color="black" />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddNewItemInput;

const styles = StyleSheet.create({
  addItemWrapper: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  addItemButtonWrapper: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
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
});
