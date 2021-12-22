import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import ConfigData from "../config.json";

export default function customerList({ navigation, route }) {
  const userData = route.params;
  const [dspCustomer, setdspCustomer] = useState([]);
  const [loading, setLoading] = useState(false);

  const userCustomer = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${ConfigData.DB_LINK}api/dsp/customer/${userData["userInfo"]._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userDataList = await response.json();
      setdspCustomer(userDataList);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isUnmounted = false;
    if (!isUnmounted) {
      userCustomer();
    }
    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <>
      {!loading ? (
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
            <Text style={{ fontSize: 24, paddingLeft: 10 }}>Customers</Text>
          </View>
          {dspCustomer.length !== 0 ? (
            <FlatList
              data={dspCustomer}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("customerInfo", {
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
                      <Entypo name="text-document" color="#52ABFA" size={25} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "#52ABFA" }}>
                No Customer(s)
              </Text>
            </View>
          )}
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
