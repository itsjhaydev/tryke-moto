import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { signInWithCredential, PhoneAuthProvider } from "firebase/auth";
import { auth, db, firebaseConfig } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import OTPInput from "@/components/Inputs/OTPInputOutlined";
import { encryptPassword } from "@/utils/encryptPassword";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

export default function OtpVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(null);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  let phoneWithCode = `+63${params.phoneNumber}`;

  const { login } = useAuth();

  useEffect(() => {
    sendVerificationCode();
  }, []);

  const sendVerificationCode = async () => {
    setIsResending(true);
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        phoneWithCode,
        recaptchaVerifier.current!
      );
      setVerificationId(id);
      Toast.show({
        type: "success",
        text1: "OTP sent",
        text2: `Code sent to ${phoneWithCode}`,
      });
    } catch (error: any) {
      console.error("OTP send error:", error);
      Toast.show({ type: "error", text1: "Error", text2: error.message });
    } finally {
      setIsResending(false);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      handleVerify();
    }
  };

  const handleVerify = async () => {
    if (!verificationId || otp.length !== 6) return;

    setIsVerifying(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const result = await signInWithCredential(auth, credential);
      const uid = result.user.uid;
      const encryptedPassword = await encryptPassword(params.password as string);


      if (params.role === "driver") {

        await setDoc(doc(db, "users", uid), {
          uid,
          firstName: params.firstName,
          lastName: params.lastName,
          phoneNumber: phoneWithCode,
          password: encryptedPassword,
          role: params.role, // should be "driver"
          todaName: "",
          todaNumber: "",
          registrationNumber: "",
          stickerImageUrl: "",
          licenseFrontUrl: "",
          licenseBackUrl: "",
          orImageUrl: "",
          crImageUrl: "",
          tricycleFrontUrl: "",
          tricycleBackUrl: "",
          tricycleSideUrl: "",
          tricycleInteriorUrl: "",
          createdAt: new Date(),
        });


        // Save local login context state
        login({
          uid,
          firstName: params.firstName,
          lastName: params.lastName,
          phoneNumber: phoneWithCode,
          role: "driver",
        });


        router.replace("/drivers-page/(tabs)");
      } else {

        Toast.show({
          type: "success",
          text1: "Welcome!",
          text2: "You're successfully registered.",
        });

        await setDoc(doc(db, "users", uid), {
          uid,
          firstName: params.firstName,
          lastName: params.lastName,
          phoneNumber: phoneWithCode,
          password: encryptedPassword,
          role: params.role,
          createdAt: new Date(),
        });

        router.replace("/homepage/(tabs)");
      }
    } catch (error: any) {
      console.error("OTP verification error:", error);
      Toast.show({
        type: "error",
        text1: "Verification Failed",
        text2: error.message,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      <OTPInput
        inputs={6}
        value={otp}
        onChangeText={setOtp}
        onAutoSubmit={handleOtpSubmit}
        containerStyle={styles.otpContainer}
        inputStyle={styles.otpInput}
      />

      <Text style={styles.resendContainer}>
        Didn’t recieve the code?{" "}
        <Text style={styles.resendText} onPress={sendVerificationCode}>
          {isResending ? "Resending..." : "Resend"}
        </Text>
      </Text>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleVerify}
        disabled={isVerifying}
      >
        {isVerifying ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerText}>REGISTER</Text>
        )}
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 70,
    backgroundColor: "#fff",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    position: "absolute",
    top: 40,
    left: 16,
  },
  backText: {
    fontSize: 16,
    marginLeft: 4,
    fontFamily: "Poppins-Regular",
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    color: "#1E3A1B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#4B5563",
    marginBottom: 36,
  },
  otpContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  otpInput: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    width: 48,
    height: 48,
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 6,
  },
  registerButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 28,
  },
  registerText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  resendContainer: {
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    marginTop: 100,
    color: "#4B5563",
    textAlignVertical: "center",
    textAlign: "center",
  },
  resendText: {
    color: "#1D4ED8",
    fontFamily: "Poppins-Medium",
  },
});
