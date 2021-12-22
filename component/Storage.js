import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Storage({ route, navigation }) {
  const dataParams = route.params;
  console.log(dataParams);
  return (
    <>
      {dataParams.type === "admin" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, paddingBottom: 10 }}>ADMIN</Text>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#52ABFA",
                width: 150,
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 10,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("addStorage", {
                  type: "load",
                  _id: dataParams._id,
                })
              }
            >
              <Text style={{ color: "white", fontSize: 20 }}>LOAD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#52ABFA",
                width: 150,
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 10,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("addStorage", {
                  type: "simcard",
                  _id: dataParams._id,
                })
              }
            >
              <Text style={{ color: "white", fontSize: 20 }}>SIM CARD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#52ABFA",
                width: 150,
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 10,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("addStorage", {
                  type: "pocketwifi",
                  _id: dataParams._id,
                })
              }
            >
              <Text style={{ color: "white", fontSize: 20 }}>POCKET WIFI</Text>
            </TouchableOpacity>
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
        </View>
      ) : dataParams.type === "dsp" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 24, paddingBottom: 10 }}>DSP</Text>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: "#52ABFA",
                width: 150,
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 10,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("addStoragev1", {
                  type: "load",
                  _id: dataParams._id,
                })
              }
            >
              <Text style={{ color: "white", fontSize: 20 }}>LOAD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#52ABFA",
                width: 150,
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 10,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("addStoragev1", {
                  type: "simcard",
                  _id: dataParams._id,
                })
              }
            >
              <Text style={{ color: "white", fontSize: 20 }}>SIM CARD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#52ABFA",
                width: 150,
                paddingTop: 10,
                paddingBottom: 10,
                marginBottom: 10,
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("addStoragev1", {
                  type: "pocketwifi",
                  _id: dataParams._id,
                })
              }
            >
              <Text style={{ color: "white", fontSize: 20 }}>POCKET WIFI</Text>
            </TouchableOpacity>
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
        </View>
      ) : undefined}
    </>
  );
}
