import * as ReactNative from 'react-native';
import Fonts from '../../constant/fonts';

// Outlined Button Component
interface OutlinedButtonProps {
    title: string;
    onPress: () => void;
}

export default function OutlinedButton({ title, onPress }: OutlinedButtonProps) {
    return (
        <ReactNative.TouchableOpacity style={styles.button} onPress={onPress}>
            <ReactNative.Text style={styles.text}>{title}</ReactNative.Text>
        </ReactNative.TouchableOpacity>
    );
}

const styles = ReactNative.StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#337B09',
        borderRadius: 15,
        alignItems: 'center',
    },
    text: {
        color: '#337B09',
        fontSize: 16,
        fontFamily: Fonts.Bold,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
});