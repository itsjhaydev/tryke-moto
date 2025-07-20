import * as React from "react";
import * as RN from "react-native";

import GroupButton from "@/components/Buttons/GroupButton";

// Sample Message Data
const SampleMessageData = [
    {
        id: 1,
        name: "John Doe",
        todo: "CAMBAL TODA",
        message: "Hello, how are you? I'm excited to meet up later and discuss our plans for the upcoming event. Let me know what time works for you.",
        time: "Today at 10:00 AM",
    },
];

interface TruncateMessageParams {
    text: string;
    maxLength?: number;
}

const truncateMessage = ({ text, maxLength = 60 }: TruncateMessageParams): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function Message() {
    interface MessageData {
        id: number;
        name: string;
        todo: string;
        message: string;
        time: string;
    }

    const handlePress = (message: MessageData): void => {
        console.log("Message Clicked:", message);
    };

    return (
        <RN.View style={styles.screen}>
            <RN.Text style={styles.title}>Messages</RN.Text>
            <RN.View style={{ alignItems: "center", marginBottom: 20 }}>
                <GroupButton
                    buttons={["Message", "Notifications"]}
                    onPress={(index) => console.log("Selected Index:", index)}
                />
            </RN.View>
            <RN.ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 100 }}>
                {SampleMessageData.map((item) => (
                    <RN.TouchableOpacity key={item.id} onPress={() => handlePress(item)} style={styles.messageCard} activeOpacity={0.6}>
                        <RN.View style={styles.messageHeader}>
                            <RN.Text style={styles.name}>{item.name}</RN.Text>
                            <RN.Text style={styles.time}>{item.time}</RN.Text>
                        </RN.View>
                        <RN.Text style={styles.todo}>{item.todo}</RN.Text>
                        <RN.Text style={styles.message} numberOfLines={2}>
                            {truncateMessage({ text: item.message })}
                        </RN.Text>
                    </RN.TouchableOpacity>
                ))}
            </RN.ScrollView>
        </RN.View>
    );
}

// Styles
const styles = RN.StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    messageCard: {
        backgroundColor: "#F5F5F5",
        borderWidth: 1,
        borderColor: "#337B09",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    messageHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    time: {
        fontSize: 12,
        color: "#777",
    },
    todo: {
        fontSize: 14,
        color: "#337B09",
        fontWeight: "bold",
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
        color: "#333",
    },
});
