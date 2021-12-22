import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function UserAddBalanace({ item, navigation }) {
  return (
    <>
      <FlatList
        data={item}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              //   console.log(item);
              navigation.navigate("Storagev1", {
                _id: item._id,
                type: "dsp",
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
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#FA3636",
            width: 150,
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 10,
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", fontSize: 20 }}>BACK</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
