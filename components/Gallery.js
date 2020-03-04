import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Modal, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImageContainer from './ImageContainer';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';

export default function Gallery({ route }) {
    const [posts, setPosts] = useState([]);
    const [links, setLinks] = useState([]);
    const [page, setPage] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(true);

    const { searchString } = route.params;

    function splitSearchString() {
        return searchString.split(' ').join('+').toLowerCase();
    }

    function getPosts() {
        axios.get(`https://testbooru.donmai.us/posts.json?page=${page}&tags=${splitSearchString()}`)
            .then(res => {
                let newPosts = posts.concat(res.data);
                let newLinks = links.concat(res.data.map(item => item.file_url));
                let newPage = page + 1;
                setPosts(newPosts);
                setLinks(newLinks);
                setPage(newPage);
                console.log(`Fetched! Now on page ${page}`);
            })
            .catch(err => console.error(`Error in API call to Danbooru posts : ${err}`));
    }

    function cleanPosts() {
        setPosts([]);
        setLinks([]);
        setPage(1);
        setModalVisible(true);
        setImageIndex(0);
        console.info('Cleaned up Gallery');
    }

    useEffect(() => {
        getPosts();

        return () => cleanPosts();
    }, []);

    function showImageViewer(index){
        setModalVisible(false);
        setImageIndex(index);
    }

    function hideImageViewer(){
        setModalVisible(true);
    }

    return (
        <ScrollView style={styles.container}>
            <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => hideImageViewer()}
            >
                <Image source={{ uri : 'https://danbooru.donmai.us/data/c4bbf0f75347aea6d33eab7fb4528834.jpg' }}/>
            </Modal>
            <View style={styles.gallery}>
                { posts.map((item, index) => (
                    <ImageContainer key={item.id} imageData={item} index={index} onPress={() => showImageViewer(index)}/> 
                    ))
                }
            </View>
            <Button onPress={() => getPosts()} title="Load More" color="#f1935c"/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f202c',
    },
    gallery: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
        paddingTop: 20,
    },
    bigText: {
        fontSize: 24,
        color: '#CC9B81',
    },
});