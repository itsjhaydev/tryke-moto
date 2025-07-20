import React, { useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

interface OTPInputProps {
  inputs: number;
  value: string;
  onChangeText: (text: string) => void;
  onAutoSubmit?: () => void;
}

export default function OTPInputOutlined({
  inputs,
  value = "", // ✅ default fallback
  onChangeText,
  onAutoSubmit,
}: OTPInputProps) {
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const otp = value.split("");
    otp[index] = text;
    const newValue = otp.join("").slice(0, inputs);
    onChangeText(newValue);

    if (text && index < inputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newValue.length === inputs && !newValue.includes("")) {
      inputRefs.current[index]?.blur();
      onAutoSubmit?.();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      const otp = value.split("");
      otp[index - 1] = "";
      onChangeText(otp.join(""));
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {Array.from({ length: inputs }, (_, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={1}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          value={(value ?? "")[index] || ""} // ✅ safe indexing
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#337B09",
    textAlign: "center",
    fontSize: 16,
  },
});
