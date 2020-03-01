import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import axios from 'axios';

export default function Gallery({ route }) {
    const [posts, setPosts] = useState([]);

    const { searchString } = route.params;

    function splitSearchString(){
        return searchString.split(' ').join('+').toLowerCase();
    }

    function getPosts(){

        axios.get(`https://testbooru.donmai.us/posts.json?tags=${splitSearchString()}`)
            .then(res => {
                setPosts(res.data);
                console.log('Fetched!');
            })
            .catch(err => console.error(`Error in API call to Danbooru posts : ${err}`));
    }

    function seePosts(){
        console.log(`searchString : ${splitSearchString()}`);
        posts.map(elem => console.log(elem.tag_string));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.bigText}>danviewer</Text>
            <Button title="Fetch" onPress={() => getPosts()}/>
            <Button title="See" onPress={() => seePosts()}/>
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
    bigText: {
        fontSize: 24,
        color: '#CC9B81',
    },
});