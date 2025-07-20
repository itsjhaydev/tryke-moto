import * as React from "react";
import * as RN from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import CustomView from "@/components/CustomView";
import TextInputOutlined from "@/components/Inputs/OutlinedTextInput";
import PasswordInputOutlined from "@/components/Inputs/OutlinedPasswordInput";
import SolidButton from "@/components/Buttons/SolidButton";

import Fonts from "@/constant/fonts";

export default function SignUpPassenger() {
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const handleConfirm = () => {
    if (!firstName || !lastName || !password || !confirmPassword || !phoneNumber) {
      RN.Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      RN.Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      RN.Alert.alert("Error", "Passwords do not match.");
      return;
    }

    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    if (cleanedPhone.length !== 10) {
      RN.Alert.alert("Error", "Phone number must be 10 digits (e.g. 9101234567).");
      return;
    }

    // ✅ All good, go to OTP screen
    router.push({
      pathname: "/auth/otp-verification",
      params: {
        firstName,
        lastName,
        password,
        phoneNumber: cleanedPhone,
        role: "passenger",
      },
    });
  };

  return (
    <CustomView>
      {/* Back Button */}
      <RN.TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#000" />
        <RN.Text style={styles.backText}>Back</RN.Text>
      </RN.TouchableOpacity>

      {/* Title and Subtitle */}
      <RN.Text style={styles.title}>Sign Up</RN.Text>
      <RN.Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </RN.Text>

      {/* Input Fields */}
      <RN.View style={styles.inputContainer}>
        <TextInputOutlined title="FIRST NAME" value={firstName} onChangeText={setFirstName} />
        <TextInputOutlined title="LAST NAME" value={lastName} onChangeText={setLastName} />
        <PasswordInputOutlined
          title="PASSWORD"
          value={password}
          onChangeText={setPassword}
          isPasswordVisible={isPasswordVisible}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <PasswordInputOutlined
          title="RE-TYPE PASSWORD"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          isPasswordVisible={isConfirmPasswordVisible}
          togglePasswordVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
        />

        {/* Phone Number Field */}
        <RN.Text style={styles.inputLabel}>ENTER PHONE NUMBER</RN.Text>
        <RN.View style={styles.phoneContainer}>
          <RN.View style={styles.phonePrefix}>
            <RN.Text style={styles.phonePrefixText}>+63</RN.Text>
          </RN.View>
          <RN.TextInput
            style={styles.phoneInput}
            placeholder="910 123 4567"
            placeholderTextColor="#BDBDBD"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={13}
          />
        </RN.View>
      </RN.View>

      {/* Confirm Button */}
      <RN.View style={{ marginTop: 40 }}>
        <SolidButton title="CONFIRM" onPress={handleConfirm} />
      </RN.View>
    </CustomView>
  );
}

const styles = RN.StyleSheet.create({
  backButton: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#000",
    fontFamily: Fonts.Medium,
  },
  title: {
    fontFamily: Fonts.Bold,
    fontSize: 24,
    color: "#154001",
    textAlign: "center",
  },
  description: {
    fontFamily: Fonts.Regular,
    fontSize: 13,
    color: "#4F4F4F",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 4,
  },
  inputContainer: {
    marginTop: 10,
    gap: 12,
  },
  inputLabel: {
    fontFamily: Fonts.SemiBold,
    fontSize: 11,
    color: "#000",
    marginBottom: 4,
    marginTop: 8,
    marginLeft: 2,
  },
  phoneContainer: {
    flexDirection: "row",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 12,
    height: 50,
  },
  phonePrefix: {
    borderRightWidth: 1,
    borderRightColor: "#BDBDBD",
    paddingRight: 12,
    marginRight: 12,
  },
  phonePrefixText: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: "#000",
  },
  phoneInput: {
    flex: 1,
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: "#000",
  },
});

