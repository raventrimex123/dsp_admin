import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, TouchableOpacity } from "react-native";

export default function Inventory({ item, navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 20,
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        INVENTORY
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#52ABFA",
          width: 150,
          paddingTop: 10,
          paddingBottom: 10,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Add Storage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#52ABFA",
          width: 150,
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Balance</Text>
      </TouchableOpacity>
    </View>
  );
}
