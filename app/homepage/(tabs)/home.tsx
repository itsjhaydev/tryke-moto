import * as React from "react";
import * as RN from "react-native";
import { useRouter } from "expo-router";

import CustomView from "@/components/CustomView";
import TodaButton from "@/components/Buttons/TodaButton";
import SolidButton from "@/components/Buttons/SolidButton";
import BookingNoticePopup from "@/components/Pop-up/BookingNoticePopup";

const SampleTodoData = [
    { toda: "CAMBAL TODA", available: 5 },
    { toda: "BUTODA", available: 0 },
    { toda: "MLCMBB TODA", available: 2 },
    { toda: "SNB TODA", available: 3 },
    { toda: "BTMT TODA", available: 1 },
    { toda: "CBLM TODA", available: 4 },
    { toda: "TC TODA", available: 0 },
];

export default function SelectTodaScreen() {
    const router = useRouter();
    const [showPopup, setShowPopup] = React.useState(true);
    const [selectedToda, setSelectedToda] = React.useState<string | null>(null);

    const handleTopUp = () => {
        setShowPopup(false);
        router.push("./e-wallet");
    };

    const handleClose = () => {
        setShowPopup(false);
    };

    const handleRequestRide = () => {
        if (selectedToda) {
            router.push({
                pathname: "../requestride",
                params: { todaName: selectedToda },
            });
        } else {
            RN.Alert.alert("Select TODA", "Please select a TODA before requesting a ride.");
        }
    };

    return (
        <CustomView>
            <RN.View style={{ alignItems: "center", marginBottom: 20 }}>
                <RN.Text style={styles.title}>SELECT TODA</RN.Text>
            </RN.View>

            {/* Booking Notice Popup */}
            <BookingNoticePopup visible={showPopup} onTopUp={handleTopUp} onClose={handleClose} />

            <RN.ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 100, maxHeight: 600 }}>
                {SampleTodoData.map((item, index) => {
                    const isSelected = selectedToda === item.toda;
                    return (
                        <RN.TouchableOpacity key={index} onPress={() => setSelectedToda(item.toda)}>
                            <TodaButton
                                title={item.toda}
                                availables={item.available}
                                isSelected={isSelected}
                                onPress={() => setSelectedToda(item.toda)}
                            />
                        </RN.TouchableOpacity>
                    );
                })}
            </RN.ScrollView>

            <RN.View style={styles.buttonPosition}>
                <SolidButton title="Request a Ride" onPress={handleRequestRide} />
            </RN.View>
        </CustomView>
    );
}

const styles = RN.StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "Poppins-Bold",
    },
    buttonPosition: {
        position: "absolute",
        bottom: 100,
        alignSelf: "center",
        width: "50%",
    },
});
