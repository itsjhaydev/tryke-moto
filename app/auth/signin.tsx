import React, { useState, useContext } from "react";
import * as RN from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { collection, query, where, getDocs } from "firebase/firestore";
import Toast from "react-native-toast-message";

import CustomView from "@/components/CustomView";
import PasswordInputOutlined from "@/components/Inputs/OutlinedPasswordInput";
import TextInputOutlined from "@/components/Inputs/OutlinedTextInput";
import SolidButton from "@/components/Buttons/SolidButton";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import Fonts from "@/constant/fonts";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import { encryptPassword } from "@/utils/encryptPassword";

export default function SignIn(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSignIn = async () => {
    if (!phoneNumber || !password) {
      Toast.show({ type: "error", text1: "Please enter phone and password" });
      return;
    }

    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({ type: "error", text1: "Location permission required" });
        return;
      }

      // Format phone number
      let formattedPhone = phoneNumber.trim();
      if (formattedPhone.startsWith("09")) {
        formattedPhone = formattedPhone.replace(/^0/, "+63");
      } else if (formattedPhone.startsWith("9")) {
        formattedPhone = "+63" + formattedPhone;
      } else if (!formattedPhone.startsWith("+63")) {
        Toast.show({ type: "error", text1: "Invalid PH number format" });
        return;
      }

      const q = query(collection(db, "users"), where("phoneNumber", "==", formattedPhone));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        Toast.show({ type: "error", text1: "User not found" });
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();
      const role = userData.role;
      const storedHashedPassword = userData.password;

      const inputHashedPassword = await encryptPassword(password);

      if (inputHashedPassword !== storedHashedPassword) {
        Toast.show({ type: "error", text1: "Incorrect password" });
        return;
      }

      login({ uid: userDoc.id, ...userData });

      // Navigate based on role
      if (role === "passenger") {
        router.replace("/homepage/(tabs)");
      } else if (role === "driver") {
        router.replace("/drivers-page/(tabs)");
      } else {
        Toast.show({ type: "error", text1: "Unrecognized role" });
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.show({ type: "error", text1: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomView primary>
      <RN.View style={styles.whiteBox}>
        <RN.View style={styles.center}>
          <RN.Image
            source={require("@/assets/images/tryke moto.png")}
            style={styles.logo}
          />
        </RN.View>

        <RN.View style={styles.inputContainer}>
          <TextInputOutlined
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <PasswordInputOutlined
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPasswordVisible={isPasswordVisible}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </RN.View>

        <RN.View style={styles.center}>
          <RN.TouchableOpacity>
            <RN.Text style={styles.forgotText}>Forgot Password?</RN.Text>
          </RN.TouchableOpacity>
        </RN.View>

        <RN.View style={styles.buttonContainer}>
          <SolidButton
            title={loading ? "Logging in..." : "Log In"}
            onPress={handleSignIn}
            disabled={loading}
          />
          <OutlinedButton
            title="Create an Account"
            onPress={() => router.push("/auth/signup")}
          />
        </RN.View>

        <RN.View style={styles.center}>
          <RN.TouchableOpacity onPress={() => router.push("/auth/signup-driver")}>
            <RN.Text style={styles.registerDriverText}>
              Register as Tryke-Moto Driver
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      </RN.View>
      <Toast />
    </CustomView>
  );
}

const styles = RN.StyleSheet.create({
  whiteBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 30,
    marginHorizontal: 20,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
    gap: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 5,
    gap: 10,
  },
  forgotText: {
    color: "#729CFF",
    fontSize: 12,
    fontFamily: Fonts.Medium,
    textDecorationLine: "underline",
    marginTop: 5,
  },
  registerDriverText: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: "#337B09",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});

