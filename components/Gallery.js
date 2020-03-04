import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Modal, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImageContainer from './ImageContainer';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Bubbles } from 'react-native-loader';
import axios from 'axios';

export default function Gallery({ route }) {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setloading] = useState(true);

    const { searchString } = route.params;

    function splitSearchString() {
        return searchString.split(' ').join('+').toLowerCase();
    }

    function createUrlList(array){
        return array.map(image => {
            return {
                id: image.id,
                url: image.file_url,
                preview_url: image.preview_file_url,
                artist: image.tag_string_artist,
                tags: image.tag_string,
            }
        });
    }

    function getPosts() {
        const booruType = 'dan' //'test' or 'dan'
        axios.get(`https://${booruType}booru.donmai.us/posts.json?page=${page}&tags=${splitSearchString()}`)
            .then(res => {
                setPosts(prevPosts => prevPosts.concat(createUrlList(res.data)));
                setPage(prevPage => prevPage + 1);
                
                console.info(`Fetched! Now on page ${page}`);
                setloading(false);
            })
            .catch(err => console.error(`Error in API call to Danbooru posts : ${err}`));
    }

    function cleanPosts() {
        setPosts([]);
        setCurrentIndex(0);
        setPage(1);
        setModalVisible(false);
        setloading(true);
        console.info('Cleaned up Gallery');
    }

    useEffect(() => {
        getPosts();

        return () => cleanPosts();
    }, []);

    function showImageViewer(index){
        setCurrentIndex(index);
        setModalVisible(true);
    }

    function hideImageViewer(){
        setModalVisible(false);
        setCurrentIndex(0);
    }

    return (
        <ScrollView style={styles.container}>
            { loading
            ? 
                <View style={styles.centeredContainer}>
                    <Bubbles size={15} color='#DE5028'/>
                </View>
            :
            <>
                <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => hideImageViewer()}
                >
                    <ImageViewer
                    imageUrls={posts}
                    index={currentIndex}
                    enablePreload={true}
                    loadingRender={() => <Bubbles size={20} color='#DE5028'/>}
                    onChange={position => (position + 1) === posts.length ? getPosts() : null}/>
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
                <Button onPress={() => getPosts()} title='Load More' color='#DE5028'/>
            </>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f202c',
    },
    centeredContainer: {
        paddingTop: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gallery: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
        paddingTop: 20,
    },
});