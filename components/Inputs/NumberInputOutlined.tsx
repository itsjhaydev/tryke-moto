import React from "react";
import * as ReactNative from "react-native";

interface NumberInputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    maxLength?: number;
    title?: string | null;
}

// NumberInputOutlined Component
export default function NumberInputOutlined({ placeholder, value, onChangeText, maxLength = 10  , title }: NumberInputProps) {
    // Function to handle number input, ensuring only digits are entered
    const handleChangeText = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        onChangeText(numericText.slice(0, maxLength)); // Limit input length
    };

    return (
        <>
            {title && <ReactNative.Text style={styles.title}>{title}</ReactNative.Text>}
            <ReactNative.View style={styles.container}>
                {/* Country Code "+63" */}
                <ReactNative.View style={styles.countryCodeContainer}>
                    <ReactNative.Text style={styles.countryCode}>+63</ReactNative.Text>
                </ReactNative.View>

                {/* Input Field */}
                <ReactNative.TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    keyboardType="numeric"
                    maxLength={maxLength}
                />
            </ReactNative.View>
        </>

    );
}

// Styles
const styles = ReactNative.StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#337B09",
        borderRadius: 15,
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 12,
        marginLeft: 10,
        textTransform: 'uppercase',
        fontFamily: 'PoppinsBold',
    },
    countryCodeContainer: {
        marginRight: 10,
    },
    countryCode: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
});
