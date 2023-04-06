import { View, Text, SafeAreaView, ScrollView, StatusBar, RefreshControl, TouchableOpacity, Image, FlatList, StyleSheet, Alert } from "react-native";
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

const QuanlyUser = (props) => {

    const navigation = useNavigation();
    const [isLoading, setisLoading] = useState(true);
    const [dssp, setdssp] = useState([]);
    const [reloading, setreloading] = useState(false);

    const getListUser = async () => {
        let url_data = "http://10.24.48.202:3000/tb_users";

        try {
            const response = await fetch(url_data);
            const json = await response.json();
            setdssp(json);
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false);
        }
    }

    const reloadData = React.useCallback(() => {
        setreloading(true);
        getListUser();
        setTimeout(() => {
            setreloading(false);
        }, 2000)
    });

    const renderDsUser = ({ item }) => {

        const Delete = () => {

            let api_api_del = "http://10.24.48.202:3000/tb_users/" + item.id;
            fetch(api_api_del, {

                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            })
                .then((res) => {
                    if (res.status == 200) {
                        alert("Xóa thành công");
                        getListUser();
                    }

                })
                .catch((err) => {
                    console.log(err);
                });
        }

        const ShowDialogDelete = () => {
            Alert.alert("Thông báo", "Bạn có muốn xóa tài khoản này không?",
                [
                    {
                        text: "YES", onPress: () => {
                            console.log("Da bam OK");
                            Delete();
                        }, style: 'default'
                    },
                    {
                        text: "NO",
                        onPress: () => {
                            console.log("Bo qua du kien")
                        }
                    }
                ],
                {
                    cancelable: true,
                    onDismiss: () => {
                        console.log("Tắt dialog");
                    }
                }
            )
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.khung}>
                        <View>
                            <Image style={{ width: 45, height: 45, borderRadius: 70, marginTop: 5 }} source={{ uri: item.image }} />
                        </View>

                        <View style={{ marginLeft: 5, padding: 5 }}>
                            <View>
                                <Text style={{ fontSize: 18, color: 'red' }}>{item.username}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15 }}>{item.email}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={ShowDialogDelete}>
                            <Text style={{ marginLeft: 150 }}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getListUser();
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View style={{ backgroundColor: '#E5E7E9', height: '100%' }}>

            <View style={styles.headers}>
                <Text style={styles.logo}>Quản lý user</Text>
            </View>

            <SafeAreaView>
            <TouchableOpacity onPress={navigation.navigate('Login')}></TouchableOpacity>
                <ScrollView refreshControl={
                    <RefreshControl refreshing={reloading}
                        onRefresh={reloadData} />
                }>
                    <FlatList data={dssp}
                        keyExtractor={(item_ds, index) => { return item_ds.id, index }}
                        renderItem={renderDsUser}
                    />
                </ScrollView>
            </SafeAreaView>
            
            <StatusBar />
        </View>
    )
}
export default QuanlyUser;

const styles = StyleSheet.create({
    headers: {
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
        fontWeight: '700',
        color: 'red'
    },
    khung: {
        padding: 10,
        margin: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5
    }
})