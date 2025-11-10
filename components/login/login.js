import GradienLayout from "../register/TemplateLayout/GradientLayout";
import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../register/style";
import { COLORS } from "../../constants";
import { scale } from "react-native-size-matters";
import InputText from "../register/Button/InputText";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "../register/Button/CustomButton";
import Policy from "../register/Policy";
import Notification from "../common/Notification";
import Spinner from "react-native-loading-spinner-overlay";
import { useSocketContext } from "../../context/SocketContext";
import { io } from "socket.io-client";
import { useSession } from "../../context/AuthContext";
import a from "@ant-design/react-native/lib/modal/alert";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { user, login } = useSession();
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { socket, setSocket, onlineUsers, setOnlineUsers } = useSocketContext();

  const baseURL = "https://se346-skillexchangebe.onrender.com";

  useEffect(() => {
    const newSocket = io(`${baseURL}`);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null || user === null) return;

    socket.emit("addOnlineUser", user?._id);

    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, user]);

  const handleLogIn = async () => {
    if (email === null || email === "") {
      setErrorEmail("Email is required");
      return;
    }

    if (password === null || password === "") {
      setErrorPassword("Password is required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await
        fetch("https://se346-skillexchangebe.onrender.com/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
      if (response.status === 401) {
        alert("Wrong email or password");
      } else if (response.status === 404) {
        alert("User not found");
      } else {
        const json = await response.json();

        setUsername(json.data.username);

        try {
          await login(json.data);
          await AsyncStorage.setItem("user", JSON.stringify(json.data));
          await AsyncStorage.setItem("accessToken", json.access_token);
          await AsyncStorage.setItem("refreshToken", json.refresh_token);
          console.log("refreshToken when login: ", json.refresh_token);
          var check = await AsyncStorage.getItem("refreshToken");
          console.log("refreshToken in storage: ", check);
        } catch (error) {
          alert("Store token failed!");
        }

        setShowMessage(true);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong! Please try again!: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePolicy = () => {
    setShowPolicy(!showPolicy);
  };

  return (
    <GradienLayout innerStyle={{ height: scale(600) }}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: COLORS.lightWhite }}
      />
      <Image source={require("../../assets/images/teamwork.png")} style={styles.image} />
      <Text
        style={{
          fontSize: 19,
          color: COLORS.orange,
          marginTop: 10,
          alignSelf: "center",
          fontFamily: "Coda-Regular",
        }}
      >
        Welcome
      </Text>
      <Text style={[styles.termText]}>By signing in you are agreeing our</Text>
      <TouchableOpacity onPress={togglePolicy}>
        <Text
          style={[
            styles.termText,
            { color: COLORS.orange, textDecorationLine: "underline" },
          ]}
        >
          Terms of Service and Privacy Policy
        </Text>
      </TouchableOpacity>
      <ScrollView style={{ marginTop: 10 }}>
        <InputText
          placeholder="Enter your email address"
          label="Email"
          iconName="mail"
          error={errorEmail}
          onFocus={() => setErrorEmail(null)}
          onChangeText={(text) => setEmail(text)}
        />
        <InputText
          placeholder="Enter your password"
          label="Password"
          error={errorPassword}
          onFocus={() => setErrorPassword(null)}
          password={true}
          iconName="lock"
          onChangeText={(text) => setPassword(text)}
        />
      </ScrollView>
      <TouchableOpacity
        style={{ width: scale(120), alignSelf: "flex-end" }}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text
          style={{
            color: COLORS.orange,
            alignSelf: "flex-end",
            marginRight: 20,
            marginTop: 10,
            fontFamily: "AbhayaLibre-Regular",
            fontSize: scale(10),
          }}
        >
          Forgot password?
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        <CustomButton
          text={"Login"}
          onPress={handleLogIn}
          style={{
            backgroundColor: COLORS.orange,
            borderColor: COLORS.orange,
            height: scale(35),
            width: "40%",
          }}
          textStyle={{ color: COLORS.lightWhite }}
        />
        <CustomButton
          margin={false}
          textColor={COLORS.orange}
          text={"Register"}
          onPress={() => navigation.navigate("EnterName")}
          style={{
            backgroundColor: COLORS.white,
            borderColor: COLORS.orange,
            borderWidth: 0.5,
            height: scale(35),
            width: "40%",
          }}
          textStyle={{ color: COLORS.white }}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
        <Text style={{ fontFamily: "AbhayaLibre-Regular", fontSize: scale(10) }}>Or sign in with</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
        <TouchableOpacity style={{ margin: 5 }}>
          <Image source={require("../../assets/images/googleIcon.png")} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ margin: 5 }}>
          <Image source={require("../../assets/images/facebookIcon.png")} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
      <Modal transparent={true} visible={showPolicy} onRequestClose={togglePolicy}>
        <Policy onPress={togglePolicy} />
      </Modal>
      <Modal transparent={true} visible={showMessage}>
        <Notification
          text={"Welcome " + username}
          iconName={"check-circle"}
          iconColor={COLORS.green}
          buttonColor={COLORS.skyBlue}
          onPress={() => {
            navigation.navigate("(tabs)");
            setShowMessage(false)
          }}
        />
      </Modal>
    </GradienLayout>
  );
};

export default Login;