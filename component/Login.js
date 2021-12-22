import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo from "../assets/178090737_482452996134415_8681946246992772024_n.jpg";

export default function Login() {
  return (
    <View style={{ marginTop: 100 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Image
          style={{ width: 300, height: 115 }}
          source={Logo}
          resizeMode={"cover"}
        />
        <Text style={{ fontSize: 35, marginBottom: 10 }}>Login</Text>
      </View>
      <View
        style={{
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 10,
          borderBottomWidth: 2,
          borderBottomColor: "#A9A9A8",
        }}
      >
        <Text style={{ fontSize: 16 }}>ADMIN ID</Text>
        <TextInput placeholder="Ex: Miruza" style={{ fontSize: 16 }} />
      </View>
      <View
        style={{
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 10,
          borderBottomWidth: 2,
          borderBottomColor: "#A9A9A8",
        }}
      >
        <Text style={{ fontSize: 16 }}>Password</Text>
        <TextInput
          placeholder="Ex: 123456"
          secureTextEntry={true}
          style={{ fontSize: 16 }}
        />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: 262,
            height: 40,
            backgroundColor: "#9ADC6D",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginBottom: 10,
          }}
          onPress={() => {
            Alert.alert("Message:", "Successfully registered.");
          }}
        >
          <Text style={{ color: "black", fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
