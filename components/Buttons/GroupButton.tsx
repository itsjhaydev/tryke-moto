import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface GroupButtonProps {
    buttons: string[];
    onPress: (index: number) => void;
}

export default function GroupButton({ buttons, onPress }: GroupButtonProps) {
    const [activeIndex, setActiveIndex] = React.useState(0);

    return (
        <View style={styles.container}>
            {buttons.map((button, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={[
                        styles.button,
                        activeIndex === index ? styles.activeButton : styles.inactiveButton,
                        index === 0 && styles.leftRounded, // Round left for first button
                        index === buttons.length - 1 && styles.rightRounded, // Round right for last button
                    ]}
                    onPress={() => {
                        setActiveIndex(index);
                        onPress(index);
                    }}
                >
                    <Text style={[styles.text, activeIndex === index && styles.activeText]}>
                        {button}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderColor: '#337B09',
        borderWidth: 1,
        borderRadius: 15,
        // padding: 2,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#337B09',
        borderRadius: 10,
    },
    inactiveButton: {
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 10,
        fontFamily: 'PoppinsBold',
        color: '#A0A0A0',
    },
    activeText: {
        color: '#FFFFFF',
    },
    leftRounded: {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    rightRounded: {
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
});
