import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Text, FlatList } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Bubbles } from 'react-native-loader';
import ImageContainer from './ImageContainer';
import axios from 'axios';

export default function Gallery({ route }) {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const { searchString } = route.params;

    function splitSearchString() {
        return searchString.split(' ').join('+').toLowerCase();
    }

    function createUrlList(array){
        return array.map(image => {
            return {
                id: Math.floor(Math.random() * 10000000),
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
                setLoading(false);
            })
            .catch(err => {
                setLoadingError(true);
                setLoading(true);
                console.error(`Error during API call to ${booruType}booru: ${err}`);
            });
    }

    function cleanPosts() {
        setPosts([]);
        setCurrentIndex(0);
        setPage(1);
        setModalVisible(false);
        setLoading(true);
        setLoadingError(false);
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
        <View style={styles.container}>
            { loading
            ? 
                <View style={styles.centeredContainer}>
                    <Bubbles size={15} color='#DE5028'/>
                    { loadingError
                    ? <Text>Couldn't retrieve posts, check your connection or try again later</Text> 
                    : null
                    }
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
                    renderFooter={() => <Text style={styles.textArtist}>Artist: {posts[currentIndex].artist}</Text>}
                    onChange={position => (position + 1) === posts.length ? getPosts() : null}
                    />
                </Modal>
                <FlatList
                style={styles.gallery}
                data={posts}
                numColumns={3}
                onEndReachedThreshold={0.3}
                onEndReached={() => getPosts()}
                renderItem={
                    ({item, index}) => (
                        <ImageContainer imageData={item} index={index} showImageViewer={showImageViewer}/>
                    )
                }
                />
            </>
            }
        </View>
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
        paddingHorizontal: 4,
        paddingTop: 20,
    },
    textArtist: {
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        color: '#f4f4f4',
    },
});