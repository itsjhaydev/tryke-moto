import React, { useState } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Picker } from "@react-native-picker/picker";
import { serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase/firebaseConfig"

import FileUploadBox from "@/components/FileUpload";
import * as FileSystem from "expo-file-system";
import { uploadBytesResumable } from "firebase/storage";

export default function DriverRegistrationScreen() {
    const router = useRouter();
    const [todaNumber, setTodaNumber] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [selectedToda, setSelectedToda] = useState<string>("");

    const [licenseFront, setLicenseFront] = useState<string | null>(null);
    const [licenseBack, setLicenseBack] = useState<string | null>(null);
    const [orImage, setOrImage] = useState<string | null>(null);
    const [crImage, setCrImage] = useState<string | null>(null);
    const [trikeFront, setTrikeFront] = useState<string | null>(null);
    const [trikeBack, setTrikeBack] = useState<string | null>(null);
    const [trikeSide, setTrikeSide] = useState<string | null>(null);
    const [trikeInterior, setTrikeInterior] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const TODA_LIST = [
        "CAMBAL TODA",
        "CBB TODA",
        "BUTODA",
        "MLCMBB TODA",
        "SNB TODA",
        "BTMT TODA",
        "CBLM TODA",
        "TC TODA",
    ];

    const uploadImageAsync = async (uri: string, path: string) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            const storageRef = ref(storage, path);
            const snapshot = await uploadBytes(storageRef, blob);

            const downloadUrl = await getDownloadURL(snapshot.ref);
            return downloadUrl;
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const user = auth.currentUser;
            if (!user) throw new Error("User not authenticated");

            const uid = user.uid;
            const timestamp = Date.now();

            const uploadedImages = {
                licenseFront: licenseFront
                    ? await uploadImageAsync(licenseFront, `drivers/${uid}/licenseFront_${timestamp}`)
                    : null,
                licenseBack: licenseBack
                    ? await uploadImageAsync(licenseBack, `drivers/${uid}/licenseBack_${timestamp}`)
                    : null,
                orImage: orImage
                    ? await uploadImageAsync(orImage, `drivers/${uid}/or_${timestamp}`)
                    : null,
                crImage: crImage
                    ? await uploadImageAsync(crImage, `drivers/${uid}/cr_${timestamp}`)
                    : null,
                trikeFront: trikeFront
                    ? await uploadImageAsync(trikeFront, `drivers/${uid}/trikeFront_${timestamp}`)
                    : null,
                trikeBack: trikeBack
                    ? await uploadImageAsync(trikeBack, `drivers/${uid}/trikeBack_${timestamp}`)
                    : null,
                trikeSide: trikeSide
                    ? await uploadImageAsync(trikeSide, `drivers/${uid}/trikeSide_${timestamp}`)
                    : null,
                trikeInterior: trikeInterior
                    ? await uploadImageAsync(trikeInterior, `drivers/${uid}/trikeInterior_${timestamp}`)
                    : null,
            };

            await updateDoc(doc(db, "users", uid), {
                todaName: selectedToda,
                todaNumber,
                registrationNumber,
                licenseFrontUrl: uploadedImages.licenseFront,
                licenseBackUrl: uploadedImages.licenseBack,
                orImageUrl: uploadedImages.orImage,
                crImageUrl: uploadedImages.crImage,
                tricycleFrontUrl: uploadedImages.trikeFront,
                tricycleBackUrl: uploadedImages.trikeBack,
                tricycleSideUrl: uploadedImages.trikeSide,
                tricycleInteriorUrl: uploadedImages.trikeInterior,
                updatedAt: serverTimestamp(),
            });

            router.replace("/success");
        } catch (error) {
            console.error("Registration Error:", error);
            alert("Something went wrong during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Driver Registration</Text>

            <Text style={styles.label}>Select TODA</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={selectedToda}
                    onValueChange={(value) => setSelectedToda(value)}
                >
                    <Picker.Item label="Select TODA" value="" />
                    {TODA_LIST.map((toda) => (
                        <Picker.Item key={toda} label={toda} value={toda} />
                    ))}
                </Picker>
            </View>

            <TextInput
                placeholder="TODA Number"
                value={todaNumber}
                onChangeText={setTodaNumber}
                style={styles.input}
            />
            <TextInput
                placeholder="Registration Number"
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
                style={styles.input}
            />
            <FileUploadBox label="Driver's License (Front)" imageUri={licenseFront} onImagePicked={(uri) => setLicenseFront(uri)} />
            <FileUploadBox label="Driver's License (Back)" imageUri={licenseBack} onImagePicked={(uri) => setLicenseBack(uri)} />
            <FileUploadBox label="OR" imageUri={orImage} onImagePicked={(uri) => setOrImage(uri)} />
            <FileUploadBox label="CR" imageUri={crImage} onImagePicked={(uri) => setCrImage(uri)} />
            <FileUploadBox label="Tricycle Front" imageUri={trikeFront} onImagePicked={(uri) => setTrikeFront(uri)} />
            <FileUploadBox label="Tricycle Back" imageUri={trikeBack} onImagePicked={(uri) => setTrikeBack(uri)} />
            <FileUploadBox label="Tricycle Side" imageUri={trikeSide} onImagePicked={(uri) => setTrikeSide(uri)} />
            <FileUploadBox label="Tricycle Interior" imageUri={trikeInterior} onImagePicked={(uri) => setTrikeInterior(uri)} />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitText}>Submit</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 100,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        color: "#333",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        color: "#444",
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginBottom: 16,
        overflow: "hidden", // to apply border radius on Picker (Android)
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        paddingHorizontal: 14,
        paddingVertical: Platform.OS === "ios" ? 14 : 10,
        marginBottom: 16,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    submitButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    submitText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 17,
    },
});
