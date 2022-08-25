import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useRef } from "react";
import Item from "./Item";
import { DraxProvider, DraxList } from "react-native-drax";
import { ShoppingListContext } from "../contexts/ShoppingListProvider";

const ShoppingListSection = ({ listData, isMaster }) => {
  const { state, dispatch } = useContext(ShoppingListContext);
 const isDraggingRef = useRef(false);

  return (
    <DraxProvider style={styles.container}>
      <View>
        <DraxList
          style={styles.draggable}
          lockItemDragsToMainAxis
          data={listData}
          keyExtractor={(item) => item.id}
          renderItemContent={({ item }) => (
            <TouchableOpacity key={item.id}>
              <Item
                item={item}
                isSelected={item.isSelected}
                isMaster={isMaster}
              />
            </TouchableOpacity>
          )}
          onItemReorder={({ fromIndex, toIndex }) => {
            const newCurrentListData = [...listData];
            newCurrentListData.splice(
              toIndex,
              0,
              newCurrentListData.splice(fromIndex, 1)[0]
            );
              isMaster ?
            dispatch({
              type: "REORDER_MASTER_LIST",
              payload: newCurrentListData,
            })
            :
            dispatch({
              type: "REORDER_CURRENT_LIST",
              payload: newCurrentListData,
            });
          }}
        />
      </View>
    </DraxProvider>
  );
};
export default ShoppingListSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  draggable: {
    height: "100%",
  },
});
