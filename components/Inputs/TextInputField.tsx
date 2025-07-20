import React from "react";
import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const TextInputField: React.FC<Props> = ({ label, value, onChangeText, ...rest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default TextInputField;

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
  input: {
    fontFamily: "Poppins-Regular",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#000",
  },
});
