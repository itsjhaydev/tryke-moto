import React, { useState } from "react";
import * as ReactNative from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Interface for props
interface StatusSwitchButtonProps {
    initialStatus?: boolean; // Default status
    onStatusChange?: (isOnline: boolean) => void; // Callback when toggled
}

export default function StatusSwitchButton({
    initialStatus = false, // Default to Offline
    onStatusChange,
}: StatusSwitchButtonProps) {
    const [isOnline, setIsOnline] = useState(initialStatus);

    // Toggle status function
    const toggleStatus = () => {
        const newStatus = !isOnline;
        setIsOnline(newStatus);
        if (onStatusChange) onStatusChange(newStatus); // Callback if provided
    };

    return (
        <ReactNative.TouchableOpacity
            style={[styles.button, isOnline ? styles.online : styles.offline]}
            onPress={toggleStatus}
            activeOpacity={0.9} // Feedback on touch
        >
            {!isOnline && <MaterialCommunityIcons name="power" size={24} color="red" />}
            <ReactNative.Text style={[styles.text, isOnline ? styles.textOnline : styles.textOffline]}>
                {isOnline ? "ONLINE" : "OFFLINE"}
            </ReactNative.Text>
            {isOnline && <MaterialCommunityIcons name="power" size={24} color="green" />}
        </ReactNative.TouchableOpacity>
    );
}

// Styles
const styles = ReactNative.StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        borderWidth: 2,
        width: 150,
    },
    online: {
        borderColor: "green",
        backgroundColor: "#E0F2E9",
    },
    offline: {
        borderColor: "red",
        backgroundColor: "#FDE8E8",
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
    },
    textOnline: {
        color: "green",
    },
    textOffline: {
        color: "red",
    },
});
