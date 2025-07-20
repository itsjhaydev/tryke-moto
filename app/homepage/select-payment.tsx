import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SelectPaymentMethodScreen = () => {
  const [selected, setSelected] = useState<"cash" | "ewallet" | null>(null);
  const router = useRouter();

  const handleSelect = (method: "cash" | "ewallet") => {
    setSelected(method);
    setTimeout(() => {
      router.push("/homepage/(tabs)"); // navigate after selection
    }, 300);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      <TouchableOpacity
        style={[
          styles.methodBox,
          selected === "cash" && styles.selectedBox,
        ]}
        onPress={() => handleSelect("cash")}
      >
        <Ionicons name="cash-outline" size={24} color={selected === "cash" ? "#fff" : "#222"} />
        <Text style={[styles.label, selected === "cash" && styles.selectedLabel]}>
          Cash
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.methodBox,
          selected === "ewallet" && styles.selectedBox,
        ]}
        onPress={() => handleSelect("ewallet")}
      >
        <Ionicons name="wallet-outline" size={24} color={selected === "ewallet" ? "#fff" : "#222"} />
        <Text style={[styles.label, selected === "ewallet" && styles.selectedLabel]}>
          TMT E-Wallet
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SelectPaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 80, // Adjusted for status bar
  },
  title: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 20,
    color: "#111",
  },
  methodBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    marginBottom: 16,
  },
  selectedBox: {
    backgroundColor: "#4CAF50",
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    color: "#222",
  },
  selectedLabel: {
    color: "#fff",
  },
});
