import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function UserBalance({ item, navigation }) {
  return (
    <>
      <FlatList
        data={item}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NewUserBalance", {
                userInfo: item,
              });
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#EEEEEE",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  height: 30,
                }}
              >
                <Text style={{ fontSize: 16, paddingLeft: 10 }}>
                  {item.name}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="point-of-sale"
                  color="#52ABFA"
                  size={25}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
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
    </>
  );
}
