import { StyleSheet, Text, View, TouchableOpacity, TextInput, Font } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../firebase/firebase';
const Login = ({navigation}) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [Email, setEmail] = useState("");
    const [password, setpassword] = useState("");


    const Sign = () => {
        if(Email.length == 0){
            alert("Chưa nhập Email");
            return;
        }
        if(password.length == 0){
            alert("Chưa nhập password");
            return;
        }
        
        signInWithEmailAndPassword(auth, Email, password).then((userSignin)=>{
            console.log('Đăng nhập');
            const user = userSignin.user;
            console.log(user);
            navigation.navigate('Home')
        }).catch(err => {
            console.log(err);
            alert("Sai Mật khẩu Hoặc Tài Khoản")
            
        })
        
    }
        


    const SingUp = () =>{
        navigation.navigate('SignUp');
    }
    return (
        <View style={styles.tieude}>
           
            <View style={styles.header}>
                <View style={styles.login}>
                    <Text style={styles.ten}>ĐĂNG NHẬP</Text>
                </View>
            </View>

            
            <View style={styles.body}>
                <View style={{ margin: 20 }}>
                    <View>
                        <Text style={{ color: 'black', fontSize: 17, fontWeight:'bold' }}>Email</Text>

                        <View style={{ flexDirection: 'row', borderBottomColor: 'grey', backgroundColor: '#EBF5FB', marginTop: 5 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                                <Icon name='user' size={18} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput placeholder={'Nhập Email'} style={{ padding: 15, fontSize: 16 }} onChangeText={ (txt) => {setEmail(txt)}}/>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: 'black', fontSize: 17, fontWeight:'bold' }}>Password*</Text>

                        <View style={{ flexDirection: 'row', borderBottomColor: 'grey', backgroundColor: '#EBF5FB', marginTop: 5}}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                                <Icon name='lock' size={18} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput secureTextEntry={true} placeholder={'Nhập password'} style={{ padding: 15, fontSize: 16 }} onChangeText={ (txt) => {setpassword(txt)}}/>
                            </View>
                        </View>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ marginTop: 10, color: 'black', fontSize: 15, fontWeight: 'bold' }}>Forgot password?</Text>
                    </View>

                    <View style={{ justifyContent: 'center', padding: 7}}>

                        <TouchableOpacity activeOpacity={0.7} onPress={Sign} style={{ backgroundColor: '#5BC0F8', padding: 16, width: '100%', alignItems: 'center', marginVertical: 10, borderRadius: 20}}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>LOGIN</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                
            </View>

            
            <View style={styles.footer}>
                <Text style={{marginLeft: 6}}>Don't have an account? </Text>
                <TouchableOpacity style={styles.signup} onPress={SingUp}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#0008C1' }}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    tieude: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    },
    ten: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 50

    },
    header: {
        flex: 1,
        marginVertical: 20,
    },
    login: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        marginBottom: 100
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signup: {
        padding: 20,
    },
    face: {
        width: 40,
        height: 40,
        padding: 10,
        backgroundColor: '#4267B2',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    twitter: {
        width: 40,
        height: 40,
        padding: 10,
        backgroundColor: '#1DA1F2',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    gg: {
        width: 40,
        height: 40,
        padding: 10,
        backgroundColor: '#FF0000',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
})