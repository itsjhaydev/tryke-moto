import React from 'react';
import { View, StyleSheet } from 'react-native';
interface CustomViewProps {
    children: React.ReactNode;
    primary?: boolean;
}

export default function CustomView({ children, primary }: CustomViewProps) {
    return (
        <View style={[styles.container, primary && styles.primary]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    primary: {
        backgroundColor: '#337b09',
    },
});