import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ConfigData from "../config.json";

export default function NewUserBalance({ route, navigation }) {
  const adminID = route.params;
  const [userSale, setuserSale] = useState([]);

  const userSales = async () => {
    try {
      const response = await fetch(
        `${ConfigData.DB_LINK}api/dsp/sale/${adminID.userInfo._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userDataList = await response.json();
      setuserSale(userDataList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isUnmounted = false;
    if (!isUnmounted) {
      userSales();
    }
    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {userSale.map((user) => {
        return (
          <View key={user._id} style={{ margin: 10 }}>
            <Text style={{ fontSize: 25 }}>LOAD</Text>
            <View style={{ padding: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: "35%",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>Load Balance:</Text>
                </View>
                <Text style={{ fontSize: 16 }}>{user.load_balance}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 25 }}>SIM CARD</Text>
            <View style={{ padding: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: "35%",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>SIM Balance:</Text>
                </View>
                <Text style={{ fontSize: 16 }}>{user.simcard_balance}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 25 }}>POCKET WIFI</Text>
            <View style={{ padding: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: "35%",
                  }}
                >
                  <Text style={{ fontSize: 16 }}>PW Balance:</Text>
                </View>
                <Text style={{ fontSize: 16 }}>{user.pocketwifi_balance}</Text>
              </View>
            </View>
          </View>
        );
      })}
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
