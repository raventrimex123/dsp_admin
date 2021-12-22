import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Button,
} from "react-native";
import ListUser from "./component/userList";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import userInfo from "./component/userInfo";
import salesReport from "./component/salesReport";
import UserTransac from "./component/Transac";
import customerList from "./component/customerList";
import customerInfo from "./component/customerInfo";
import Logo from "./assets/178090737_482452996134415_8681946246992772024_n.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Storage from "./component/Storage";
import trashComponents from "./component/trashComponents";
import addStorage from "./component/addStorage";
import UserBalance from "./component/userBalance";
import UserAddBalanace from "./component/userAddBalance";
import InventoryBalance from "./component/inventoryBalance";
import AdminBalance from "./component/adminBalance";
import NewUserBalance from "./component/newuserBalance";
import DateTimePicker from "@react-native-community/datetimepicker";
import ConfigData from "./config.json";

export default function App() {
  const [isLogin, setisLogin] = useState(false);
  const [userList, setuserList] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [Loginloading, setLoginLoading] = useState(false);
  const [tiadmin, setTiadmin] = useState(null);
  const [tipassword, setTipassword] = useState(null);
  const [edit, setEdit] = useState(false);
  const [RefreshAdminLoading, setRefreshAdminLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ConfigData.DB_LINK}api/dsp/data/dsp`);
      const userDataList = await response.json();
      setuserList(userDataList);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveValidID = async (data) => {
    if (data !== null) {
      await AsyncStorage.setItem("_id", data);
      getValidID();
    }
  };

  const getValidID = async () => {
    setLoadingLogin(true);
    try {
      const data = await AsyncStorage.getItem("_id");
      if (data !== null) {
        const response = await fetch(
          `${ConfigData.DB_LINK}api/dsp/admin/${data}`
        );
        const adminDataList = await response.json();
        setAdminData(adminDataList);
        setisLogin(true);
        setLoadingLogin(false);
      }
      setLoadingLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAdmin = async () => {
    setRefreshAdminLoading(true);
    try {
      const data = await AsyncStorage.getItem("_id");
      if (data !== null) {
        const response = await fetch(
          `${ConfigData.DB_LINK}api/dsp/admin/${data}`
        );
        const adminDataList = await response.json();
        setAdminData(adminDataList);
        setRefreshAdminLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CheckLogin = async () => {
    setLoginLoading(true);
    try {
      if (tiadmin === null) {
        Alert.alert("Message", "Please don't leave the ADMIN ID blank.");
        setLoginLoading(false);
      } else if (tipassword === null) {
        Alert.alert("Message", "Please don't leave the password blank.");
        setLoginLoading(false);
      } else {
        const response = await fetch(
          `${ConfigData.DB_LINK}api/dsp/admin/${tiadmin}/${tipassword}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const userDataList = await response.json();
        if (userDataList.message === "Invalid Credentials") {
          Alert.alert("Message", `${userDataList.message}.`);
        } else {
          saveValidID(userDataList._id);
        }
        setTiadmin(null);
        setTipassword(null);
        setLoginLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isUnmounted = false;
    if (!isUnmounted) {
      getValidID();
      getUsers();
    }
    return () => {
      isUnmounted = true;
    };
  }, []);

  function Dashboard() {
    return (
      <>
        {!loading ? (
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 25, paddingLeft: 10 }}>DSP Users</Text>
              <View style={{ paddingRight: 30 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Octicons name="primitive-dot" color={"#9ADC6D"} size={15} />
                  <Text style={{ paddingLeft: 5 }}>Online</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Octicons name="primitive-dot" color={"#FA3636"} size={15} />
                  <Text style={{ paddingLeft: 5 }}>Offline</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#D7D7D7",
                height: 35,
                alignItems: "center",
              }}
            >
              <View style={{ width: "50%", paddingLeft: 10 }}>
                <Text style={{ fontSize: 18 }}>Name</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Status
                </Text>
              </View>
            </View>
            <FlatList
              data={userList}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
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
                    <Octicons
                      name="primitive-dot"
                      color={item.ustat ? "#9ADC6D" : "#FA3636"}
                      size={15}
                    />
                  </View>
                </View>
              )}
            />
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
            <ActivityIndicator size={25} color="#9ADC6D" />
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Loading...
            </Text>
          </View>
        )}
      </>
    );
  }

  const dspSalesStacks = createNativeStackNavigator();
  const TransactionStacks = createNativeStackNavigator();
  const inventoryStacks = createNativeStackNavigator();
  const settingsStacks = createNativeStackNavigator();

  function dspSettings({ navigation }) {
    return (
      <settingsStacks.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <settingsStacks.Screen name="adminInfo" component={adminInfo} />
      </settingsStacks.Navigator>
    );
  }

  const adminInfo = ({ navigation }) => {
    const userData = adminData[0];
    const [AN, setAN] = useState(null);
    const [PN, setPN] = useState(null);
    const [AL, setAL] = useState(null);
    const [ADD, setADD] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== "web") {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      })();
    }, []);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
        base64: true,
      });

      if (!result.cancelled) {
        setImage(result["base64"]);
      }
    };

    const clearData = () => {
      setAN(null);
      setPN(null);
      setImage(null);
      setAL(null);
      setADD(null);
    };

    var raw = JSON.stringify({
      image: image,
    });

    const saveUpdate = async () => {
      try {
        if (AN === null) {
          Alert.alert("Message", "Don't leave the field blank");
        } else if (PN === null) {
          Alert.alert("Message", "Don't leave the field blank");
        } else if (image === null) {
          Alert.alert("Message", "Please select your profile picture");
        } else if (AL === null) {
          Alert.alert("Message", "Don't leave the field blank");
        } else if (ADD === null) {
          Alert.alert("Message", "Don't leave the field blank");
        } else {
          const response = await fetch(
            `${ConfigData.DB_LINK}api/dsp/updateadmin/${userData._id}/${AN}/${PN}/${AL}/${ADD}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: raw,
            }
          );
          const userDataList = await response.json();
          if (userDataList.modifiedCount === 1) {
            Alert.alert("Message:", "Successfully Updated");
            setEdit(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <>
        {edit ? (
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 24 }}>EDIT</Text>
            </View>
            <View
              style={{
                height: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image ? (
                <Image
                  source={{ uri: `data:image/png;base64,${image}` }}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <View style={{ backgroundColor: "#D7D7D7", padding: 20 }}>
                  <SimpleLineIcons name="user" size={55} color="#6B6B6B" />
                </View>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#52ABFA",
                  padding: 5,
                  marginTop: 10,
                }}
                onPress={() => pickImage()}
              >
                <Text style={{ color: "white" }}>UPLOAD IMAGE</Text>
              </TouchableOpacity>
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
              <Text style={{ fontSize: 16 }}>Account Name</Text>
              <TextInput
                value={AN}
                onChangeText={(data) => setAN(data)}
                style={{ fontSize: 16 }}
              />
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
              <Text style={{ fontSize: 16 }}>ID Number</Text>
              <TextInput
                value={userData.idm}
                style={{ fontSize: 16 }}
                editable={false}
              />
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
              <Text style={{ fontSize: 16 }}>Phone Number</Text>
              <TextInput
                value={PN}
                onChangeText={(data) => setPN(data)}
                style={{ fontSize: 16 }}
              />
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
              <Text style={{ fontSize: 16 }}>Area Located</Text>
              <TextInput
                value={AL}
                onChangeText={(data) => setAL(data)}
                style={{ fontSize: 16 }}
              />
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
              <Text style={{ fontSize: 16 }}>Address</Text>
              <TextInput
                value={ADD}
                onChangeText={(data) => setADD(data)}
                style={{ fontSize: 16 }}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#52ABFA",
                  paddingLeft: 51,
                  paddingRight: 51,
                  paddingBottom: 10,
                  paddingTop: 10,
                }}
                onPress={() => saveUpdate()}
              >
                <Text style={{ fontSize: 16, color: "white" }}>SAVE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FA3636",
                  paddingLeft: 50,
                  paddingRight: 50,
                  paddingBottom: 10,
                  paddingTop: 10,
                  marginTop: 10,
                }}
                onPress={() => {
                  clearData();
                  setEdit(false);
                }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: "white" }}>
            {!RefreshAdminLoading ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontSize: 24 }}>ADMIN ACCOUNT SETTINGS</Text>
                </View>
                <View
                  style={{
                    height: 150,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {userData.image ? (
                    <Image
                      source={{
                        uri: `data:image/png;base64,${userData.image}`,
                      }}
                      style={{ width: 100, height: 100 }}
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
                  <Text>{userData.name}</Text>
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
                  <Text>{userData.idm}</Text>
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
                  <Text>+63{userData.mobile_number}</Text>
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
                  <Text>{userData.area_located}</Text>
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
                  <Text>{userData.address}</Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#52ABFA",
                      paddingLeft: 51,
                      paddingRight: 51,
                      paddingBottom: 10,
                      paddingTop: 10,
                    }}
                    onPress={() => {
                      setEdit(true);
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "white" }}>EDIT</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <ActivityIndicator size={25} color="#9ADC6D" />
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  Loading...
                </Text>
              </View>
            )}
          </View>
        )}
      </>
    );
  };

  const Inventory = ({ navigation }) => {
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
            INVENTORY
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#52ABFA",
              width: 150,
              paddingTop: 10,
              paddingBottom: 10,
              marginBottom: 10,
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("trashComponents", { _id: adminData[0]._id });
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Add Storage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#52ABFA",
              width: 150,
              paddingTop: 10,
              paddingBottom: 10,
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("InventoryBalance", {
                _id: adminData[0]._id,
              });
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Balance</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const dspBalanceSet = ({ navigation }) => {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#D7D7D7",
            height: 35,
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%", paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>Name</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}></Text>
          </View>
        </View>
        <UserBalance item={userList} navigation={navigation} />
      </View>
    );
  };

  const dspAddBalanceSet = ({ navigation }) => {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#D7D7D7",
            height: 35,
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%", paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>Name</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}></Text>
          </View>
        </View>
        <UserAddBalanace item={userList} navigation={navigation} />
      </View>
    );
  };

  function dspInventory({ navigation }) {
    return (
      <inventoryStacks.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <inventoryStacks.Screen name="Invent" component={Inventory} />
        <inventoryStacks.Screen name="Storage" component={Storage} />
        <inventoryStacks.Screen
          name="trashComponents"
          component={trashComponents}
        />
        <inventoryStacks.Screen name="addStorage" component={addStorage} />
        <inventoryStacks.Screen name="userbalanced" component={dspBalanceSet} />
        <inventoryStacks.Screen
          name="useraddbalanced"
          component={dspAddBalanceSet}
        />
        <inventoryStacks.Screen name="Storagev1" component={Storage} />
        <inventoryStacks.Screen name="addStoragev1" component={addStorage} />
        <inventoryStacks.Screen name="AdminBalance" component={AdminBalance} />
        <inventoryStacks.Screen
          name="NewUserBalance"
          component={NewUserBalance}
        />
        <inventoryStacks.Screen
          name="InventoryBalance"
          component={InventoryBalance}
        />
      </inventoryStacks.Navigator>
    );
  }

  const Transac = ({ navigation }) => {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#D7D7D7",
            height: 35,
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%", paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>Name</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}></Text>
          </View>
        </View>
        <UserTransac item={userList} navigation={navigation} />
      </View>
    );
  };

  function dspTransac() {
    return (
      <TransactionStacks.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <TransactionStacks.Screen name="userTransac" component={Transac} />
        <dspSalesStacks.Screen name="customerList" component={customerList} />
        <dspSalesStacks.Screen name="customerInfo" component={customerInfo} />
      </TransactionStacks.Navigator>
    );
  }

  const dataSet = ({ navigation }) => {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#D7D7D7",
            height: 35,
            alignItems: "center",
          }}
        >
          <View style={{ width: "50%", paddingLeft: 10 }}>
            <Text style={{ fontSize: 18 }}>Name</Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}></Text>
          </View>
        </View>
        <ListUser item={userList} navigation={navigation} />
      </View>
    );
  };

  function dspSales() {
    return (
      <dspSalesStacks.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <dspSalesStacks.Screen name="userReport" component={dataSet} />
        <dspSalesStacks.Screen name="userInfo" component={userInfo} />
        <dspSalesStacks.Screen name="salesReport" component={salesReport} />
      </dspSalesStacks.Navigator>
    );
  }

  const CustomDrawer = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
              backgroundColor: "#1F1D36",
              marginBottom: 5,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, color: "white" }}>Dessert Fox</Text>
              <Text style={{ color: "white" }}>Capstone</Text>
            </View>
          </View>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            onPress={() => {
              AsyncStorage.clear();
              setisLogin(false);
            }}
            inactiveBackgroundColor="#FA7365"
            inactiveTintColor="white"
          />
        </DrawerContentScrollView>
      </View>
    );
  };

  const Drawer = createDrawerNavigator();

  const SetMeeting = () => {
    const [date, setDate] = useState(new Date(1637850959862));
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [content, setContent] = useState(null);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode("date");
    };

    const showTimepicker = () => {
      showMode("time");
    };

    const setMeeting = async () => {
      try {
        if (content) {
          const raw = JSON.stringify({
            content: content,
            data_time: date,
          });

          const data = await fetch(`${ConfigData.DB_LINK}api/dsp/meeting`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: raw,
          });

          const response = await data.json();

          if (response) {
            Alert.alert("Message", "Successfully Announced.");
            setContent(null);
          } else {
            console.log("something went wrong");
          }
        } else {
          Alert.alert("Message", "Don't leave the field blank.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24 }}>SET MEETING</Text>
        </View>
        <View style={{ marginLeft: 20 }}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              alignItems: "center",
            }}
          >
            <Button onPress={showDatepicker} title="Set Date" />
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text>{`Date: ${date.toLocaleDateString()}`}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button onPress={showTimepicker} title="Set Time" />
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text>{`${date.toLocaleString("zh-CN")}`}</Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginRight: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#A9A9A8",
            }}
          >
            <Text style={{ fontSize: 16 }}>Message:</Text>
            <TextInput
              placeholder="Announcement"
              multiline
              style={{ fontSize: 16 }}
              onChangeText={(data) => setContent(data)}
              value={content}
            />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onChange}
            />
          )}
          <View
            style={{
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#9ADC6D",
                width: 100,
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => setMeeting()}
            >
              <Text style={{ fontSize: 16, color: "white", letterSpacing: 2 }}>
                SEND
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  function MyDrawer() {
    return (
      <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Dashboard}
          options={{
            headerRight: () => (
              <MaterialCommunityIcons.Button
                name="refresh"
                size={25}
                backgroundColor="transparent"
                color="#52ABFA"
                selectionColor="transparent"
                onPress={() => getUsers()}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="dspsales"
          options={{ title: "DSP Sales" }}
          component={dspSales}
        />
        <Drawer.Screen
          name="dspTransac"
          options={{ title: "Transaction History" }}
          component={dspTransac}
        />
        <Drawer.Screen
          name="dspInventory"
          options={{ title: "Inventory" }}
          component={dspInventory}
        />
        <Drawer.Screen
          name="dspSettings"
          options={{ title: "Settings" }}
          component={dspSettings}
          options={{
            headerRight: () => (
              <MaterialCommunityIcons.Button
                name="refresh"
                size={25}
                backgroundColor="transparent"
                color="#52ABFA"
                selectionColor="transparent"
                onPress={() => refreshAdmin()}
              />
            ),
            title: "Settings",
          }}
        />
        <Drawer.Screen
          name="dspMeeting"
          options={{ title: "Set Meeting" }}
          component={SetMeeting}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {isLogin ? (
        <MyDrawer />
      ) : loadingLogin ? (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <ActivityIndicator size={25} color="#9ADC6D" />
          <Text style={{ textAlign: "center", fontSize: 16 }}>Loading...</Text>
        </View>
      ) : (
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
            <TextInput
              value={tiadmin}
              onChangeText={(data) => setTiadmin(data)}
              placeholder="Ex: Miruza"
              style={{ fontSize: 16 }}
            />
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
              value={tipassword}
              onChangeText={(data) => setTipassword(data)}
              placeholder="Ex: 123456"
              secureTextEntry={true}
              style={{ fontSize: 16 }}
            />
          </View>
          {!Loginloading ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  width: 262,
                  height: 40,
                  backgroundColor: "#52ABFA",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                onPress={() => CheckLogin()}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                disabled={Loginloading}
                style={{
                  width: 262,
                  height: 40,
                  backgroundColor: "#52ABFA",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  marginBottom: 10,
                }}
                onPress={() => CheckLogin()}
              >
                <ActivityIndicator size={25} color="#9ADC6D" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </NavigationContainer>
  );
}
