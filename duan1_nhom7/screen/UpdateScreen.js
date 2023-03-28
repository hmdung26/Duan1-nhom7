import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialIcons';


const UpdatePost = (props) => {
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");
    const [img_source, setimg_source] = useState(null);
    const [img_base64, setiimg_base64] = useState(null);
    const [id, setid] = useState()
    const [title1, settitle1] = useState()
    React.useEffect(() => {
        setid(props.route.params.item_post.id)
        settitle(props.route.params.item_post.title)
        setcontent(props.route.params.item_post.content)
        setiimg_base64(props.route.params.item_post.image)
    }, []);
    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setimg_source(result.assets[0].uri);

            let _uri = result.assets[0].uri;
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1);

            FileSystem.readAsStringAsync(_uri, { encoding: 'base64' })
                .then((res) => {
                    setiimg_base64("data:image/" + file_ext + ";base64," + res);
                    console.log(img_base64);
                });
        }
    }

    const saveList = () => {
        let _id = props.route.params.item_post.id;
        let objList = { id: id, title: title, content: content, image: img_base64 }
        console.log(_id);


        let url_data = "http://10.24.48.202:3000/tb_posts/" + id;
        fetch(url_data, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objList)
        })
            .then((res) => {
                if (res.status == 200) {
                    alert('Update thành công');
                }

            })
            .catch((ex) => {
                console.log(ex);
            });
    }


    return (
        <View style={{ backgroundColor: '#D0D3D4', height: '100%' }}>

            <View style={styles.header}>
                <Text style={styles.logo}>Đăng bài</Text>
            </View>

            <View style={{ padding: 10 }}>
                <View style={{ width: '100%', height: 60, backgroundColor: 'white', marginTop: 10, borderRadius: 5 }}>
                    <TextInput value={title} placeholder='Nhập tiêu đề' style={{ padding: 10 }} onChangeText={(txt) => { settitle(txt) }} />
                </View>

                <View style={{ width: '100%', height: 280, backgroundColor: 'white', marginTop: 15, borderRadius: 5 }}>
                    <TextInput value={content} placeholder='Nhập nội dung' style={{ padding: 10 }} onChangeText={(txt) => { setcontent(txt) }} />
                </View>

                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 10, flexDirection: 'row' }}>

                    <TouchableOpacity onPress={pickImage} style={{
                        backgroundColor: '#3C79F5', width: 130, padding: 10, borderRadius: 10, marginRight: 100
                    }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Chọn ảnh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={saveList}
                        activeOpacity={0.6}
                        style={{
                            backgroundColor: '#3C79F5', width: 130, padding: 10, borderRadius: 10
                        }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Update</Text>
                    </TouchableOpacity>

                </View>

                {img_base64 && <Image value={img_base64} source={{ uri: img_base64 }} style={{ width: 200, height: 150, marginTop: 10 }} />}
            </View>
        </View>
    )
}
export default UpdatePost;

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#fff',
        width: '100%',
        elevation: 5,
        justifyContent: 'flex-end',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    logo: {
        fontSize: 22,
        fontWeight: '800',
        color: 'red'
    }
})