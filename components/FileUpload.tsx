import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    GestureResponderEvent,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

type FileUploadProps = {
    label: string;
    imageUri: string | null;
    onImagePicked: (uri: string | null) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ label, imageUri, onImagePicked }) => {
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            onImagePicked(uri);
        }
    };

    const removeImage = (event: GestureResponderEvent) => {
        event.stopPropagation(); // prevent pickImage from triggering
        onImagePicked(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                {imageUri ? (
                    <>
                        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                        <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
                            <Ionicons name="close-circle" size={24} color="red" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <Ionicons name="cloud-upload-outline" size={32} color="#888" />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default FileUpload;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontFamily: "Poppins-Medium",
        fontSize: 14,
        marginBottom: 8,
    },
    uploadBox: {
        width: "100%",
        height: 150,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#f9f9f9",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
    },
    imagePreview: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    removeButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 2,
    },
});
