import * as React from "react";
import * as RN from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

import SolidButton from "@/components/Buttons/SolidButton";
import StatusSwitchButton from "@/components/Buttons/StatusSwitchButton";
import DriverQueue from "@/components/DriverQueue";
import PopupMessage from "@/components/Pop-up/popUpMessage";

export default function Home() {
    const router = useRouter();
    const [location, setLocation] = React.useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
    const mapRef = React.useRef<MapView>(null);

    const [popupVisible, setPopupVisible] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                // Center the map on the user's location
                if (mapRef.current) {
                    mapRef.current.animateToRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            } catch (error) {
                setErrorMsg('Error getting location');
                console.error(error);
            }

            // Simulate popup trigger after 3s
            setTimeout(() => {
                setPopupVisible(true);
            }, 3000);

        })();
    }, []);


    const handleAccept = () => {
        console.log("✅ Ride Accepted");
        setPopupVisible(false);
    };

    const handleCancel = () => {
        console.log("❌ Ride Cancelled");
        setPopupVisible(false);
    };

    const handleMessage = () => {
        console.log("💬 Message tapped");
        // router.push("/chat"); // optionally open chat
    };


    return (
        <RN.View style={styles.container}>
            <RN.View style={{ position: "absolute", top: 40, right: 15, zIndex: 1 }}>
                <StatusSwitchButton
                    onStatusChange={(isOnline) => console.log("Status changed:", isOnline ? "Online" : "Offline")}
                />

            </RN.View>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_DEFAULT}
                showsUserLocation={true} // This shows the default blue dot
                followsUserLocation={true} // Map will follow user location
                showsMyLocationButton={false} // Shows the "locate me" button
                initialRegion={{
                    latitude: location?.coords.latitude || 0,
                    longitude: location?.coords.longitude || 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="Your Location"
                    />
                )}
            </MapView>

            {errorMsg && (
                <RN.Text style={styles.errorText}>{errorMsg}</RN.Text>
            )}

            <RN.View style={styles.queuePosition}>
                <DriverQueue
                    toda="Cambal Toda"
                    queue={1}
                />
            </RN.View>

            {/* ✅ Popup modal */}
            <PopupMessage
                visible={popupVisible}
                onAccept={handleAccept}
                onCancel={handleCancel}
                onMessage={handleMessage}
            />
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    queuePosition: {
        position: "absolute",
        bottom: 100,
        alignSelf: "center",
        width: "50%",
    },
    errorText: {
        position: "absolute",
        top: 50,
        alignSelf: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        color: "red",
    },
});