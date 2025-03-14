import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { baseUrl } from "@/api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/reports_login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("Login response:", response);
      const data = await response.json();
      console.log(data);

      if (data.error) {
        Alert.alert("Login Failed", data.error);
      } else {
        await AsyncStorage.setItem("userInfo", JSON.stringify(data)); // Save JWT
        Alert.alert("Success", "Login successful!");
        router.replace("/(tabs)");
        // Navigate to next screen (replace with your navigation logic)
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      <Stack.Screen name="/login" options={{ headerShown: false }} />
      {/* HotelPlus Logo */}
      {/* <Image
        source={require("./assets/hotelplus_logo.png")}
        className="w-40 h-40 mb-6"
      /> */}

      <Text className="text-2xl font-bold text-gray-800 mb-6">
        HotelPlus Reports Login
      </Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white"
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 bg-white"
      />

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-blue-600 p-4 rounded-lg"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg text-center">Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Login;
