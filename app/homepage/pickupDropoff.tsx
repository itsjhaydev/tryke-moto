// app/homepage/location.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import PickupDropoffInput from "@/components/Inputs/PickupDropoffInput";
import { Ionicons } from "@expo/vector-icons";

const savedPlaces = [
  { id: "1", label: "Home", icon: "home-outline", address: "Blk 3 Lot 7, Pinagbuklod" },
  { id: "2", label: "Work", icon: "briefcase-outline", address: "San Jose Town Plaza" },
  { id: "3", label: "School", icon: "school-outline", address: "STI College Alabang" },
  { id: "4", label: "Other Place", icon: "location-outline", address: "Puregold Zapote" },
];

export default function LocationSelectorScreen() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupSet, setPickupSet] = useState(false);

  const router = useRouter();

  const handleUseCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is needed to use this feature.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (geocode.length > 0) {
        const place = geocode[0];
        const addressParts = [
          place.name,
          place.street,
          place.subregion || place.region,
          place.city,
        ].filter(Boolean); // Remove undefined values

        const address = addressParts.join(", ");
        setPickup(address);
        setPickupSet(true);
      } else {
        Alert.alert("Error", "Unable to get address from location.");
      }
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", "Unable to fetch current location.");
    }
  };


  const handlePlaceSelect = (address: string) => {
    if (!pickupSet) {
      setPickup(address);
      setPickupSet(true);
    } else if (!dropoff) {
      setDropoff(address);
      router.push("./requestride");
    }
  };

  return (
    <View style={styles.container}>
      <PickupDropoffInput
        pickup={pickup}
        dropoff={dropoff}
        onChangePickup={setPickup}
        onChangeDropoff={setDropoff}
        onUseCurrentLocation={handleUseCurrentLocation}
        isPickupEnabled={!pickupSet}
        isDropoffEnabled={pickupSet}
      />

      <View style={styles.savedPlacesContainer}>
        <Text style={styles.sectionTitle}>Saved Places</Text>
        <FlatList
          data={savedPlaces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.placeItem}
              onPress={() => handlePlaceSelect(item.address)}
            >
              <Ionicons name={item.icon as any} size={20} color="#555" style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.placeLabel}>{item.label}</Text>
                <Text style={styles.placeAddress}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  savedPlacesContainer: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
  },
  placeLabel: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    color: "#222",
  },
  placeAddress: {
    fontFamily: "PoppinsLight",
    fontSize: 12,
    color: "#666",
  },
});
