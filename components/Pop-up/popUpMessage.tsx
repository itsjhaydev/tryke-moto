import React, { useEffect, useRef } from "react";
import {
    Modal,
    Animated,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { FontAwesome5, Foundation } from "@expo/vector-icons";

type Props = {
    visible: boolean;
    onMessage: () => void;
    onAccept: () => void;
    onCancel: () => void;
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

const PopupMessage: React.FC<Props> = ({ visible, onMessage, onAccept, onCancel }) => {
    const translateY = useRef(new Animated.Value(-SCREEN_HEIGHT)).current;

    useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

    return (
        <Modal transparent visible={visible} animationType="none">
            <View style={styles.modalBackground}>
                <Animated.View style={[styles.overlay, { transform: [{ translateY }] }]}>
                    <View style={styles.card}>
                        <Text style={styles.label}>Passenger</Text>
                        <Text style={styles.passengerName}>Maria Nora C. Villapuerte</Text>

                        <TouchableOpacity style={styles.messageButton}>
                            <Text style={styles.messageText}>Message</Text>
                        </TouchableOpacity>

                        <View style={styles.separator} />

                        <View style={styles.locationSection}>
                            <View style={styles.locationIcons}>
                                <Foundation name="target-two" size={20} color="#337B09" />
                                <View style={styles.verticalLine} />
                                <FontAwesome5 name="map-marker-alt" size={18} color="#B91C1C" />
                            </View>
                            <View style={styles.locationTexts}>
                                <Text style={styles.text}>Malamig Bustos, Bulacan</Text>
                                <View style={styles.line} />
                                <Text style={styles.text}>Malamig Elementary School</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <Text style={styles.paymentLabel}>Payment Method</Text>
                        <Text style={styles.text}>e-Wallet (TMT)</Text>

                        <View style={styles.fareRow}>
                            <Text style={styles.fareLabel}>Base Fare</Text>
                            <Text style={styles.fareValue}>Php 0.00</Text>
                        </View>
                        <View style={styles.fareRow}>
                            <Text style={styles.fareLabel}>Booking Fee</Text>
                            <Text style={styles.fareValue}>Php 15.00</Text>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.totalFareRow}>
                            <Text style={styles.totalFareLabel}>Total Fare</Text>
                            <Text style={styles.totalFare}>PHP 45.00</Text>
                        </View>
                    </View>

                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.acceptBtn} onPress={onAccept}>
                            <Text style={styles.acceptText}>Accept</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default PopupMessage;




const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)", // dark transparent background
    },
    overlay: {
        flex: 1,
        backgroundColor: "#337B09",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        maxHeight: 580,
        borderRadius: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        width: "100%",
        maxWidth: 400,
        elevation: 8,
    },
    label: {
        fontSize: 12,
        color: "#666",
    },
    passengerName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    messageButton: {
        backgroundColor: "#337B09",
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 5,
    },
    messageText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    locationSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    locationIcons: {
        alignItems: "center",
        marginRight: 10,
    },

    locationTexts: {
        flex: 1,
    },
    verticalLine: {
        width: 2,
        height: 10,
        backgroundColor: "#ccc",
        marginVertical: 1,
    },
    line: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginVertical: 5,
    },
    text: {
        fontSize: 14,
        color: "#333",
    },
    paymentLabel: {
        fontSize: 12,
        color: "#666",
        marginTop: 10,
    },
    fareRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    fareLabel: {
        fontSize: 14,
        color: "#aaa",
    },
    fareValue: {
        fontSize: 14,
        color: "#333",
    },
    totalFareRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    totalFareLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    totalFare: {
        fontSize: 16,
        fontWeight: "bold",
    },
    actionButtons: {
        marginTop: 15,
        width: "100%",
        maxWidth: 200,
    },
    acceptBtn: {
        backgroundColor: "#fff",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 10,
    },
    acceptText: {
        color: "#337B09",
        fontSize: 16,
        fontWeight: "bold",
    },
    cancelBtn: {
        backgroundColor: "#B91C1C",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    cancelText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
