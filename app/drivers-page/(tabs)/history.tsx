import * as React from "react";
import * as RN from "react-native";

import GroupButton from "@/components/Buttons/GroupButton";

export default function History() {
    return (
        <RN.View style={styles.screen}>
            <RN.View style={{ alignItems: "center", marginBottom: 20 }}>
                <RN.Text style={styles.title}>History</RN.Text>
            </RN.View>
            <RN.View style={styles.buttonContainer}>
                <GroupButton 
                    buttons={["Upcoming","Completed", "Cancelled"]} 
                    onPress={(index) => console.log("Selected Index:", index)} 
                />
            </RN.View>
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20, // Add padding to avoid edge issues
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    buttonContainer: {
        width: "100%", // FIX: Ensure full width
        alignItems: "center", // Center the button group
    },
});
