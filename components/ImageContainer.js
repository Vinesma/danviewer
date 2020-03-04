import React from 'react';
import { StyleSheet, View, Image, Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ImageContainer(props) {
    const imageData = props.imageData;
    const index = props.index;

    return (
        <TouchableOpacity onPress={() => props.showImageViewer(index)}>
            <View style={styles.container}>
                <Image
                style={styles.image}
                source={{ uri: imageData.preview_url }}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
    },
    image: {
        width: 110,
        height: 110,
    },
});