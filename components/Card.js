import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { mainColor } from '../utils/colors'

function Card({
    backgroundColor,
    children }) {
    return (
        <View
            style={[
                styles.container,
                backgroundColor ? { backgroundColor } : {},
            ]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 16,
        margin: 16,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 3,
        shadowOpacity: 0.5,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    }
})

export default Card