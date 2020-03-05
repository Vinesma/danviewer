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
        return array.map(elem => {
            return {
                id: Math.floor(Math.random() * 10000000),
                url: elem.file_url,
                preview_url: elem.preview_file_url,
                artist: elem.tag_string_artist,
                tags: elem.tag_string,
                width: elem.image_width,
                height: elem.image_height,
            }
        });
    }

    function getPosts() {
        const booruType = 'dan'; //'test' or 'dan'
        axios.get(`https://${booruType}booru.donmai.us/posts.json?page=${page}&tags=${splitSearchString()}`)
            .then(res => {
                setPosts(prevPosts => prevPosts.concat(createUrlList(res.data)));
                setPage(prevPage => prevPage + 1);
                setLoading(false);
                
                console.info(`Fetched! Now on page ${page}`);
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

    function showImageViewer(index){
        setCurrentIndex(index);
        setModalVisible(true);
    }

    function hideImageViewer(){
        setModalVisible(false);
        setCurrentIndex(0);
    }

    function fetchOnEndOfImageList(index){
        if ((index + 1) === posts.length){
            getPosts();
        }
    }

    useEffect(() => {
        getPosts();

        return () => cleanPosts();
    }, []);

    return (
        <View style={styles.container}>
            { loading
            ? 
                <View style={styles.paddedCenteredContainer}>
                    <Bubbles size={15} color='#DE5028'/>
                    { loadingError
                    ?
                        <Text
                        style={styles.mainText}
                        >
                            Couldn't retrieve posts, check your connection or try again later
                        </Text>
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
                    renderFooter={() => <Text style={styles.mainText}>Artist: {posts[currentIndex].artist}</Text>
                    }
                    onChange={position => {
                        setCurrentIndex(position);
                        fetchOnEndOfImageList(position);
                    }}
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paddedCenteredContainer: {
        paddingTop: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gallery: {
        paddingHorizontal: 4,
        paddingTop: 20,
    },
    mainText: {
        marginBottom: 10,
        fontSize: 18,
        color: '#f4f4f4',
    },
});