import * as ReactNative from 'react-native';

// Solid Button Component
interface SolidButtonProps {
    title: string;
    onPress: () => void;
}

export default function SolidButton({ title, onPress }: SolidButtonProps) {
    return (
        <ReactNative.TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.9}>
            <ReactNative.Text style={styles.text}>{title}</ReactNative.Text>
        </ReactNative.TouchableOpacity>
    );
}

const styles = ReactNative.StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#337B09',
        borderRadius: 15,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'PoppinsBold',
    },
});