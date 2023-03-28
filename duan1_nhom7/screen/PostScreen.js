import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export default function PostScreen() {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [img_source, setimg_source] = useState(null);
  const [img_base64, setiimg_base64] = useState(null);


  const pickImage = async () => {

    // Đọc ảnh từ thư viện thì không cần khai báo quyền
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setimg_source(result.assets[0].uri);
      // chuyển ảnh thành base64 để upload lên json
      let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file

      FileSystem.readAsStringAsync(_uri, { encoding: 'base64' })
        .then((res) => {
          setiimg_base64("data:image/" + file_ext + ";base64," + res);
          console.log(img_base64);
        });

    }

  }

  
  return (
    <View style={{ backgroundColor: '#D0D3D4', height: '100%' }}>

      <View style={styles.header}>
        <Text style={styles.logo}>Đăng bài</Text>
      </View>

      <View style={{padding: 10}}>
        <View style={{ width: '100%', height: 60, backgroundColor: 'white', marginTop: 10, borderRadius: 5 }}>
          <TextInput placeholder='Nhập tiêu đề' style={{ padding: 10 }} onChangeText={(txt) => { settitle(txt) }}></TextInput>
        </View>

        <View style={{ width: '100%', height: 280, backgroundColor: 'white', marginTop: 15, borderRadius: 5 }}>
          <TextInput placeholder='Nhập nội dung' style={{ padding: 10 }} onChangeText={(txt) => { setcontent(txt) }}></TextInput>
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
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Submit</Text>
          </TouchableOpacity>

        </View>

        {img_base64 && <Image source={{ uri: img_base64 }} style={{ width: 200, height: 150, marginTop: 10 }} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
    elevation: 5,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center'
  },
  logo: {
    fontSize: 22,
    fontWeight: '800',
    color: 'red'
  }
})