import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordInputField: React.FC<Props> = ({ label, value, onChangeText }) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          secureTextEntry={secure}
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.icon}>
          <Ionicons name={secure ? "eye-off" : "eye"} size={20} color="#555" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#000",
  },
  icon: {
    marginLeft: 8,
  },
});
