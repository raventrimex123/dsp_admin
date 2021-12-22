import React from "react";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function userInfo({ navigation, route }) {
  const userData = route.params;
  console.log(userData["userInfo"].image);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 24 }}>{userData["userInfo"].name}</Text>
        <Text style={{ fontSize: 24, paddingLeft: 10 }}>Sales</Text>
      </View>
      <View
        style={{
          height: 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userData["userInfo"].image ? (
          <Image
            source={{
              uri: `data:image/png;base64,${userData["userInfo"].image}`,
            }}
            style={{
              width: 100,
              height: 100,
              borderWidth: 1,
              borderColor: "black",
            }}
          />
        ) : (
          <View style={{ backgroundColor: "#D7D7D7", padding: 20 }}>
            <SimpleLineIcons name="user" size={55} color="#6B6B6B" />
          </View>
        )}
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
        <Text>ID Number:</Text>
        <Text>{userData["userInfo"].idm}</Text>
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
        <Text>Area Located:</Text>
        <Text>{userData["userInfo"].area_located}</Text>
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
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "#52ABFA", padding: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("salesReport", {
              userSales: userData["userInfo"]._id,
            });
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>
            Sales Information
          </Text>
        </TouchableOpacity>
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
