import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Modal, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImageContainer from './ImageContainer';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';

export default function Gallery({ route }) {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [urlList, setUrlList] = useState([]);

    const { searchString } = route.params;

    function splitSearchString() {
        return searchString.split(' ').join('+').toLowerCase();
    }

    function createUrlList(array){
        return array.map(item => { return {url: item.file_url} });
    }

    function createPreviewUrlList(array){
        return array.map(item => item.preview_file_url);
    }

    function getPosts() {
        axios.get(`https://testbooru.donmai.us/posts.json?page=${page}&tags=${splitSearchString()}`)
            .then(res => {
                setPosts(prevPosts => prevPosts.concat(res.data));
                setPage(prevPage => prevPage + 1);
                
                console.info(`Fetched! Now on page ${page}`);
                urlList.forEach(item => console.info(item));
            })
            .catch(err => console.error(`Error in API call to Danbooru posts : ${err}`));
    }

    function cleanPosts() {
        setPosts([]);
        setUrlList([]);
        setPage(1);
        setModalVisible(false);
        console.info('Cleaned up Gallery');
    }

    useEffect(() => {
        getPosts();

        return () => cleanPosts();
    }, []);

    function showImageViewer(imageUrl){
        setModalVisible(true);
    }

    function hideImageViewer(){
        setModalVisible(false);
    }

    return (
        <ScrollView style={styles.container}>
            <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => hideImageViewer()}
            >
                <ImageViewer imageUrls={urlList}/>
            </Modal>
            <View style={styles.gallery}>
                { posts.map((item, index) => (
                    <ImageContainer
                    key={item.id}
                    imageData={item}
                    index={index}
                    showImageViewer={showImageViewer}/>
                    ))
                }
            </View>
            <Button onPress={() => getPosts()} title='Load More' color='#f1935c'/>
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
    image: {
        height: 150,
        width: 150,
    }
});