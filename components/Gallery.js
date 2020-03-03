import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import ImageContainer from './ImageContainer';

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

    const extractKey = ({ id }) => id.toString();

    return (
        <FlatList
        style={styles.container}
        data={posts}
        keyExtractor={extractKey}
        numColumns={3}
        renderItem={({item}) => <ImageContainer imageData={item}/>} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 5,
        backgroundColor: '#1f202c',
    },
    bigText: {
        fontSize: 24,
        color: '#CC9B81',
    },
});