import * as React from "react";
import * as RN from "react-native";
import CustomView from "@/components/CustomView";
import SolidButton from "@/components/Buttons/SolidButton";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import DropDown from "@/components/DropDown";
import { useRouter } from 'expo-router';

export default function RequestRide() {
    const [selectedTODA, setSelectedTODA] = React.useState<string | null>(null);
    const router = useRouter();

    return (
        <CustomView>
            {/* TODA Dropdown */}
            <RN.View style={{  marginTop: 25, gap: 10 }}>
                <SolidButton title="PICK UP LOCATION" onPress={() => console.log("Request Ride")} />
                <SolidButton title="DROP OFF LOCATION" onPress={() => console.log("Request Ride")} />
            </RN.View>
            {/* Fare Breakdown */}
            <RN.View style={styles.fareContainer}>
                <RN.Text style={styles.title}>Fare Breakdown</RN.Text>
                <RN.View style={styles.fareRow}>
                    <RN.Text style={styles.fareLabel}>Base Fare:</RN.Text>
                    <RN.Text style={styles.fareAmount}>₱00.00</RN.Text>
                </RN.View>
                <RN.View style={styles.fareRow}>
                    <RN.Text style={styles.fareLabel}>Booking Fee:</RN.Text>
                    <RN.Text style={styles.fareAmount}>₱00.00</RN.Text>
                </RN.View>
                <RN.View style={styles.fareTotalRow}>
                    <RN.Text style={styles.fareTotalLabel}>Total:</RN.Text>
                    <RN.Text style={styles.fareTotalAmount}>₱00.00</RN.Text>
                </RN.View>
            </RN.View>

            {/* Buttons */}
            <RN.View style={styles.buttonContainer}>
                <SolidButton title="Choose Payment Method" onPress={() => console.log("Request Ride")} />
                <OutlinedButton title="Cancel" onPress={() => router.push('../homepage/(tabs)')} />
            </RN.View>
        </CustomView>
    );
}

const styles = RN.StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        color: "#777",
        marginBottom: 10,
    },
    fareContainer: {
        marginVertical: 20,
        padding: 15,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        marginTop: 10,
    },
    fareRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    fareLabel: {
        fontSize: 16,
        color: "#555",
    },
    fareAmount: {
        fontSize: 16,
        fontWeight: "bold",
    },
    fareTotalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingTop: 150,
    },
    fareTotalLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    fareTotalAmount: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#337B09",
    },
    buttonContainer: {
        // put all the buttons in the bottom of the screen
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "column",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
});

