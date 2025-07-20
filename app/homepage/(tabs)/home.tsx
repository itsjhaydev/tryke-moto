import * as React from "react";
import * as RN from "react-native";
import { useRouter } from 'expo-router';

import CustomView from "@/components/CustomView";
import TodaButton from "@/components/Buttons/TodaButton";
import SolidButton from "@/components/Buttons/SolidButton";

const SampleTodoData = [
    {
        "toda": "CAMBAL TODA",
        "available": 5,
    },
    {
        "toda": "BUTODA",
        "available": 0,
    },
    {
        "toda": "MLCMBB TODA",
        "available": 2,
    },
    {
        "toda": "SNB TODA",
        "available": 3,
    },
    {
        "toda": "BTMT TODA",
        "available": 1,
    },
    {
        "toda": "CBLM TODA",
        "available": 4,
    },
    {
        "toda": "TC TODA",
        "available": 0,
    }
];
export default function Home() {
    const router = useRouter();
    return (
        <>
            <CustomView>
                <RN.View style={{ alignItems: "center", marginBottom: 20 }}>
                    <RN.Text style={styles.title}>SELECT TODA</RN.Text>
                </RN.View>
                <RN.ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 100, maxHeight: 600 }}>
                    {SampleTodoData.map((item, index) => (
                        <RN.TouchableOpacity key={index} onPress={() => console.log("Selected:", item.toda)}>
                            <TodaButton title={item.toda} availables={item.available} onPress={() => console.log("Button Pressed")} />
                        </RN.TouchableOpacity>
                    ))}
                </RN.ScrollView>

                <RN.View style={styles.buttonPosition}>
                    <SolidButton title="Request a Ride" onPress={() => router.push('../requestride')} />
                </RN.View>
            </CustomView>
        </>
    )
}

const styles = RN.StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    buttonPosition: {
        position: "absolute",
        bottom: 100,
        alignSelf: "center",
        width: "50%",
    },
});