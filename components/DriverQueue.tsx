import * as React from "react";
import * as RN from "react-native";

interface DriverQueueProps {
    toda?: string;
    queue?: number;
}

// DriverQueue Component
export default function DriverQueue({ toda = "CAMBAL TODA", queue = 1 }: DriverQueueProps) {
    return (
        <RN.View style={styles.container}>
            <RN.Text style={styles.todaText}>{toda}</RN.Text>
            <RN.Text style={styles.queueLabel}>YOUR QUEUE</RN.Text>
            <RN.Text style={styles.queueNumber}>{queue}</RN.Text>
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: 2,
    },
    todaText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
    },
    queueLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: "#555",
    },
    queueNumber: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#337b09",
    },
});
