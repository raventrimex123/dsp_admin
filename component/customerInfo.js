import React from "react";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { View, Text, TouchableOpacity } from "react-native";

export default function customerInfo({ navigation, route }) {
  const userData = route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 24 }}>{userData["userInfo"].name}</Text>
        <Text style={{ fontSize: 24, paddingLeft: 10 }}>Info</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Text>Account Name:</Text>
        <Text>{userData["userInfo"].name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Text>Transaction #:</Text>
        <Text>{userData["userInfo"].transaction}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Text>Phone Number:</Text>
        <Text>+63{userData["userInfo"].mobile_number}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Text>Date:</Text>
        <Text>{userData["userInfo"].date}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Text>Address:</Text>
        <Text>{userData["userInfo"].address}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Text>Type:</Text>
        <Text>{userData["userInfo"].type}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <Text>Amount:</Text>
        <Text>{userData["userInfo"].amount}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FA3636",
            paddingLeft: 51,
            paddingRight: 51,
            paddingBottom: 10,
            paddingTop: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
