import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import ConfigData from "../config.json";

export default function addStorage({ route, navigation }) {
  const typeData = route.params;
  const [userSale, setuserSale] = useState([]);
  const [Balanced, setBalance] = useState(null);

  const addBalance = async () => {
    try {
      if (Balanced) {
        const response = await fetch(
          `${ConfigData.DB_LINK}api/dsp/sale/${typeData._id}/${typeData.type}/${Balanced}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const userDataList = await response.json();
        if (userDataList.acknowledged) {
          Alert.alert("Message:", `Successfully added amount.`);
          setBalance(null);
        } else {
          Alert.alert("Message:", `Something went wrong, please try again!`);
          setBalance(null);
        }
      } else {
        Alert.alert("Message:", `Please type the amount!`);
        setBalance(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const userSales = async () => {
    // setLoading(true);
    try {
      const response = await fetch(
        `${ConfigData.DB_LINK}api/dsp/sale/${typeData._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userDataList = await response.json();
      setuserSale(userDataList);
      // setLoading(false);
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
          {typeData.type === "load"
            ? "LOAD"
            : typeData.type === "simcard"
            ? "SIM CARD"
            : typeData.type === "pocketwifi"
            ? "POCKET WIFI"
            : undefined}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text>Current Balance: </Text>
          {typeData.type === "load" ? (
            userSale.map((item, index) => {
              return <Text key={index}>{item.load_balance}</Text>;
            })
          ) : typeData.type === "simcard" ? (
            userSale.map((item, index) => {
              return <Text key={index}>{item.simcard_balance}</Text>;
            })
          ) : typeData.type === "pocketwifi" ? (
            userSale.map((item, index) => {
              return <Text key={index}>{item.pocketwifi_balance}</Text>;
            })
          ) : (
            <Text>Something went wrong</Text>
          )}
        </View>
        <View
          style={{
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 10,
            marginTop: 10,
            borderBottomWidth: 2,
            borderBottomColor: "#A9A9A8",
            width: 200,
          }}
        >
          <Text style={{ fontSize: 16 }}>Amount:</Text>
          <TextInput
            value={Balanced}
            onChangeText={(data) => setBalance(data)}
            placeholder="Ex: 10000"
            style={{ fontSize: 16 }}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#9ADC6D",
            width: 150,
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 10,
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() => addBalance()}
        >
          <Text style={{ color: "white", fontSize: 20 }}>ADD</Text>
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
    </>
  );
}
