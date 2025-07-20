import React from 'react';
import * as ReactNative from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordInputProps {
    title?: string | null;
    value: string;
    placeholder?: string;
    onChangeText: (text: string) => void;
    isPasswordVisible: boolean;
    togglePasswordVisibility: () => void;
}

export default function PasswordInputOutlined({
    title,
    value,
    onChangeText,
    isPasswordVisible,
    togglePasswordVisibility,
    placeholder,
}: PasswordInputProps) {
    return (
        <>
            {title && <ReactNative.Text style={styles.title}>{title}</ReactNative.Text>}
            <ReactNative.View style={styles.passwordContainer}>
                <ReactNative.TextInput
                    style={styles.TextInput}
                    placeholder={placeholder}
                    secureTextEntry={!isPasswordVisible}
                    value={value}
                    onChangeText={onChangeText}
                />
                <ReactNative.TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={styles.eyeIcon}
                >
                    <Ionicons
                        name={isPasswordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color="#337B09"
                    />
                </ReactNative.TouchableOpacity>
            </ReactNative.View>
        </>

    );
}

const styles = ReactNative.StyleSheet.create({
    title: {
        fontSize: 12,
        marginLeft: 10,
        textTransform: 'uppercase',
        fontFamily: 'PoppinsBold',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    },
    TextInput: {
        flex: 1,
        padding: 15,
        borderWidth: 1,
        borderColor: '#337B09',
        borderRadius: 15,
        fontSize: 14,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
});
