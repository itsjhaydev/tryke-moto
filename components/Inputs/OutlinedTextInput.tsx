import * as ReactNative from 'react-native';

interface TextInputProps {
    title?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
}

export default function OutlinedTextInput(props: TextInputProps) {
    return (
        <ReactNative.View style={styles.container}>
            {props.title && <ReactNative.Text style={styles.title}>{props.title}</ReactNative.Text>}
            <ReactNative.TextInput
                style={styles.TextInput}
                placeholder={props.placeholder}
                placeholderTextColor="#999" // Explicitly set placeholder color
                value={props.value}
                onChangeText={props.onChangeText}
            />
        </ReactNative.View>
    );
}

const styles = ReactNative.StyleSheet.create({
    container: {
        width: "100%", // Ensures proper layout
    },
    title: {
        fontSize: 12,
        marginLeft: 10,
        textTransform: 'uppercase',
        fontFamily: 'PoppinsBold',
    },
    TextInput: {
        width: "100%", // Ensure TextInput takes full width
        padding: 15,
        borderWidth: 1,
        borderColor: '#337B09',
        borderRadius: 15,
        fontSize: 14,
        color: "#000", // Ensure text color is set
    },
});
