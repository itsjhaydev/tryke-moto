import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { storage, firestore, auth } from "@/firebase/firebaseConfig";

import TextInput from "@/components/Inputs/TextInputField";
import DropDown from "@/components/DropDown";
import FileUploadBox from "@/components/FileUpload";

export default function DriverRegistrationScreen() {
  const router = useRouter();

  const [todaName, setTodaName] = useState("");
  const [todaNumber, setTodaNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [selectedToda, setSelectedToda] = useState<string | null>(null);

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

  const handleImagePick = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageAsync = async (
    uri: string,
    path: string
  ): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const uid = user.uid;
      const timestamp = Date.now();

      // Upload all images and get their URLs
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

      // Save data to Firestore
      await addDoc(collection(firestore, "drivers"), {
        uid,
        todaName,
        todaNumber,
        registrationNumber,
        selectedToda,
        documents: uploadedImages,
        createdAt: serverTimestamp(),
      });

      router.replace("/success"); // or show success toast
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

      <DropDown
        label="Select TODA"
        items={TODA_LIST}
        selectedValue={selectedToda}
        onValueChange={setSelectedToda}
      />

      <TextInput
        placeholder="TODA Name"
        value={todaName}
        onChangeText={setTodaName}
      />
      <TextInput
        placeholder="TODA Number"
        value={todaNumber}
        onChangeText={setTodaNumber}
      />
      <TextInput
        placeholder="Registration Number"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />

      <FileUploadBox
        label="Driver's License (Front)"
        imageUri={licenseFront}
        onPick={() => handleImagePick(setLicenseFront)}
      />
      <FileUploadBox
        label="Driver's License (Back)"
        imageUri={licenseBack}
        onPick={() => handleImagePick(setLicenseBack)}
      />
      <FileUploadBox label="OR" imageUri={orImage} onPick={() => handleImagePick(setOrImage)} />
      <FileUploadBox label="CR" imageUri={crImage} onPick={() => handleImagePick(setCrImage)} />

      <FileUploadBox label="Tricycle Front" imageUri={trikeFront} onPick={() => handleImagePick(setTrikeFront)} />
      <FileUploadBox label="Tricycle Back" imageUri={trikeBack} onPick={() => handleImagePick(setTrikeBack)} />
      <FileUploadBox label="Tricycle Side" imageUri={trikeSide} onPick={() => handleImagePick(setTrikeSide)} />
      <FileUploadBox label="Tricycle Interior" imageUri={trikeInterior} onPick={() => handleImagePick(setTrikeInterior)} />

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
    padding: 20,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
