import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function UserTransac({ item, navigation }) {
  return (
    <FlatList
      data={item}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("customerList", {
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
              <Text style={{ fontSize: 16, paddingLeft: 10 }}>{item.name}</Text>
            </View>
            <View
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="history"
                color="#52ABFA"
                size={25}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
