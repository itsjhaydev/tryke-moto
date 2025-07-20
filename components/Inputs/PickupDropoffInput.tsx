import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    pickup: string;
    dropoff: string;
    onChangePickup: (val: string) => void;
    onChangeDropoff: (val: string) => void;
    onUseCurrentLocation: () => void;
    isPickupEnabled: boolean;
    isDropoffEnabled: boolean;
};

export default function PickupDropoffInput({
    pickup,
    dropoff,
    onChangePickup,
    onChangeDropoff,
    onUseCurrentLocation,
    isPickupEnabled,
    isDropoffEnabled,
}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Pickup Location</Text>
            <View style={styles.inputWrapper}>
                <Ionicons name="location" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={[styles.input, !isPickupEnabled && styles.disabled]}
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChangeText={onChangePickup}
                    editable={isPickupEnabled}
                />
            </View>

            <Text style={[styles.label, { marginTop: 16 }]}>Drop-off Location</Text>
            <View style={styles.inputWrapper}>
                <Ionicons name="flag-outline" size={20} color="#555" style={styles.icon} />
                <TextInput
                    style={[styles.input, !isDropoffEnabled && styles.disabled]}
                    placeholder="Enter drop-off location"
                    value={dropoff}
                    onChangeText={onChangeDropoff}
                    editable={isDropoffEnabled}
                />
            </View>

            {isPickupEnabled && (
                <TouchableOpacity style={styles.currentLocationBtn} onPress={onUseCurrentLocation}>
                    <Ionicons name="navigate-circle-outline" size={20} color="#fff" />
                    <Text style={styles.currentLocationText}>Use My Current Location</Text>
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    label: {
        fontFamily: "PoppinsMedium",
        fontSize: 14,
        marginBottom: 4,
        color: "#333",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontFamily: "PoppinsRegular",
        fontSize: 14,
        paddingVertical: 10,
        color: "#000",
    },
    disabled: {
        color: "#999",
    },
    currentLocationBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#00C851",
        padding: 10,
        borderRadius: 8,
        justifyContent: "center",
        marginTop: 6,
    },
    currentLocationText: {
        color: "#fff",
        fontFamily: "PoppinsMedium",
        marginLeft: 6,
        fontSize: 14,
    },
});
