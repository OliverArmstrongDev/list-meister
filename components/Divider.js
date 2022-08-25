import { View, Text } from 'react-native'
import React from 'react'

const Divider = ({text, mb}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: mb, }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ textAlign: "center" }}> {text} </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
  )
}

export default Divider