import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function trashComponents({ route, navigation }) {
  const adminID = route.params;
  return (
    <>
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
          onPress={() => {
            navigation.navigate("Storage", {
              type: "admin",
              _id: adminID._id,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>FOR ADMIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#52ABFA",
            width: 150,
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("useraddbalanced");
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>FOR DSP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FA3636",
            width: 150,
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 10,
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", fontSize: 20 }}>BACK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
