import * as ReactNative from 'react-native';

interface TodaButtonProps {
    title: string;
    availables: number;
    onPress: () => void;
}

// Toda Button Component
export default function TodaButton({ title, availables, onPress }: TodaButtonProps) {
    return (
        <ReactNative.TouchableOpacity style={styles.button} onPress={onPress}>
            <ReactNative.Text style={styles.text}>{title}</ReactNative.Text>
            <ReactNative.View style={styles.availabilityContainer}>
                <ReactNative.Text style={styles.availableText}>{availables}</ReactNative.Text>
                <ReactNative.View
                    style={[
                        styles.statusDot,
                        { backgroundColor: availables > 0 ? '#28a745' : '#dc3545' } // Green if available, Red if not
                    ]}
                />
            </ReactNative.View>
        </ReactNative.TouchableOpacity>
    );
}

const styles = ReactNative.StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#337B09',
        flexDirection: 'row', // Align title & availability horizontally
        justifyContent: 'space-between', // Space between title & availability
        alignItems: 'center', // Align items vertically
        marginBottom: 10, // Space between buttons
    },
    text: {
        // color: '#337B09',
        fontSize: 16,
        fontWeight: 'bold',
    },
    availabilityContainer: {
        flexDirection: 'row', // Align dot & text horizontally
        alignItems: 'center', // Align items vertically
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5, // Make it circular
        marginRight: 5, // Space between dot & text
    },
    availableText: {
        color: '#999', // Grey color for text
        fontSize: 14,
        fontWeight: 'light',
        textTransform: 'uppercase', // Uppercase for available text
        marginRight: 5, // Space between dot & text
    },
});
