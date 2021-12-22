import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export default function salesReport({ navigation, route }) {
  const userID = route.params;
  const [userSale, setuserSale] = useState([]);
  const [loading, setLoading] = useState(false);

  const userSales = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dfa-db.herokuapp.com/api/dsp/sale/${userID["userSales"]}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userDataList = await response.json();
      setuserSale(userDataList);
      setLoading(false);
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
    <>
      {!loading ? (
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
                      <Text style={{ fontSize: 16 }}>Over All Load:</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.load.overall}
                    </Text>
                  </View>
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
                      <Text style={{ fontSize: 16 }}>Load Distributed:</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.load.distributed}
                    </Text>
                  </View>
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
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.load.balance}
                    </Text>
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
                      <Text style={{ fontSize: 16 }}>Over All SIM:</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.simcard.overall}
                    </Text>
                  </View>
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
                      <Text style={{ fontSize: 16 }}>SIM Distributed:</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.simcard.distributed}
                    </Text>
                  </View>
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
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.simcard.balance}
                    </Text>
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
                      <Text style={{ fontSize: 16 }}>Over All PW:</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.pocketwifi.overall}
                    </Text>
                  </View>
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
                      <Text style={{ fontSize: 16 }}>PW Distributed:</Text>
                    </View>
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.pocketwifi.distributed}
                    </Text>
                  </View>
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
                    <Text style={{ fontSize: 16 }}>
                      {user.sales.pocketwifi.balance}
                    </Text>
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
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#9ADC6D" />
          <Text style={{ textAlign: "center", fontSize: 16 }}>Loading...</Text>
        </View>
      )}
    </>
  );
}
