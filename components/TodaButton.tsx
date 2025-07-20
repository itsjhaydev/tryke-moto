import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  availables: number;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isSelected?: boolean; // 👈 Add this
};

export default function TodaButton({
  title,
  availables,
  onPress,
  style,
  textStyle,
  isSelected = false, // 👈 Default false
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        style,
      ]}
    >
      <Text
        style={[
          styles.title,
          isSelected && styles.selectedTitle,
          textStyle,
        ]}
      >
        {title}
      </Text>
      <View style={styles.dotContainer}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: availables > 0 ? "green" : "gray",
            },
          ]}
        />
        <Text style={styles.countText}>{availables} members</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  selectedContainer: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 8,
    color: "#000",
  },
  selectedTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  countText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
});
