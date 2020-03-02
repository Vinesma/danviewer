import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

export default function Gallery({ route }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    const { searchString } = route.params;

    function splitSearchString() {
        return searchString.split(' ').join('+').toLowerCase();
    }

    function getPosts() {
        axios.get(`https://testbooru.donmai.us/posts.json?page=${page}&tags=${splitSearchString()}`)
            .then(res => {
                setPosts(res.data);
                console.log('Fetched!');
            })
            .catch(err => console.error(`Error in API call to Danbooru posts : ${err}`));
    }

    function cleanPosts() {
        setPosts([]);
        setPage(1);
    }

    useEffect(() => {
        getPosts();

        return () => cleanPosts();
    }, [page]);

    const extractKey = ({ id }) => id;

    return (
        <FlatList
        style={styles.container}
        data={posts}
        keyExtractor={extractKey}
        renderItem={({item}) => <Image style={styles.image} source={{ uri: item.preview_file_url }}></Image>} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#1f202c',
    },
    bigText: {
        fontSize: 24,
        color: '#CC9B81',
    },
    image: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
});