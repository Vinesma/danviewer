import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, Button } from 'react-native';

import logo from '../assets/danbooruIcon.png';

export default function MainMenu({ navigation }) {
    const [searchText, setSearchText] = useState('')

    return (
        <View style={styles.container}>
            <Image style={styles.mainIcon} source={logo}/>
            <TextInput
            style={styles.searchBar}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholder="Tags to search for..."
            />
            <View style={{ marginTop: 15 }}>
                <Button
                style={styles.primaryButton}
                onPress={() => navigation.navigate('Gallery', { searchString: searchText })}
                title="   Search   "
                color="#f1935c"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#1f202c',
        alignItems: 'center',
    },
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
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 3,
        borderStyle: 'solid',
        borderColor: '#f1935c',
    },
});