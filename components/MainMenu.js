import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, Button } from 'react-native';

import logo from '../assets/danbooruIcon.png';

export default function MainMenu() {
    const [searchText, setSearchText] = useState('')

    return (
        <>
            <Image style={styles.mainIcon} source={logo}/>
            <Text style={styles.bigText}>danviewer</Text>
            <TextInput
            style={styles.searchBar}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Tags to search for..."
            />
            <View style={{ marginTop: 15 }}>
                <Button
                style={styles.primaryButton}
                onPress={() => alert('Button Tap!')}
                title="   Search   "
                color="#f1935c"
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainIcon: {
        width: 200,
        height: 200,
    },
    bigText: {
        fontSize: 24,
        color: '#CC9B81',
    },
    searchBar: {
        color: '#fafafa',
        marginTop: 15,
        width: 250,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 3,
        borderStyle: 'solid',
        borderColor: '#f1935c',
    },
});