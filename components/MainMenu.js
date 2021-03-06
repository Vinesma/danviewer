import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View, Button } from 'react-native';

import logo from '../assets/danbooruIcon.png';

export default function MainMenu({ navigation }) {
    const [searchText, setSearchText] = useState('')

    return (
        <View style={styles.container}>
            <Image style={styles.mainIcon} source={logo}/>
            <View style={styles.containerRow}>
                <TextInput
                style={styles.searchBar}
                value={searchText}
                onChangeText={text => setSearchText(text)}
                placeholder="Tags to search for..."
                />
                <Button
                style={styles.clearButton}
                onPress={() => setSearchText('')}
                title="Clear"
                color="#f1935c"/>
            </View>
            <View style={{ marginTop: 20 }}>
                <Button
                onPress={() => navigation.navigate('Gallery', { searchString: searchText })}
                title="    Search    "
                color="#DE5028"
                />
            </View>
            <View>{/* RECENT SEARCHES */}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 12,
        backgroundColor: '#1f202c',
        alignItems: 'center',
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainIcon: {
        width: 200,
        height: 200,
    },
    searchBar: {
        position: 'relative',
        left: 3,
        flexGrow: 1,
        color: '#fafafa',
        paddingVertical: 2,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 3,
        borderStyle: 'solid',
        borderColor: '#f1935c',
    },
    clearButton: {
        flexGrow: 1,
        marginLeft: 10,
    },
});