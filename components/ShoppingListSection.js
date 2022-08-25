import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Item from './Item'

const ShoppingListSection = ({listData, isMaster}) => {
  
  return (
    <View style={styles.shoppingList}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={listData}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Item key={item.id} item={item} isSelected={item.isSelected} isMaster={isMaster}/>
              </TouchableOpacity>
            )}
          />
        </View>
  )
}
export default ShoppingListSection

const styles = StyleSheet.create({ 
    shoppingList: {
        flex: 1,
        width: "100%",
      },
});