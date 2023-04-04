import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../firebase/firebase';


const SignUpScreen = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [username, setusername] = useState('');
    const [passwd, setpasswd] = useState('');
    const [email, setemail] = useState('');
    const [rePasswd, setrePasswd] = useState('');

    const navigation = useNavigation();

    const Login = () => {
        navigation.navigate('Login');
    }

    const SignUp = () => {

        createUserWithEmailAndPassword(auth, email, passwd).then(()=>{
            
            const user = userCredential.user;
            console.log(user);
        })
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView>
            <View style={{ padding: 15, backgroundColor: 'white', height: '100%' }}>
                <View style={{ margin: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: '#000' }}>CREATE ACCOUNT</Text>

                </View>

                <View style={{}}>
                    <TextInput placeholder='Username' placeholderTextColor={'#808B96'}
                        style={{ fontSize: 17, backgroundColor: '#EBF5FB', padding: 15 }}
                        onChangeText={(txt) => { setusername(txt) }}
                    />
                    <TextInput placeholder='Email' placeholderTextColor={'#808B96'}
                        style={{ fontSize: 17, backgroundColor: '#EBF5FB', padding: 15, marginTop: 15 }}
                        onChangeText={(txt) => { setemail(txt) }}
                    />
                    <TextInput placeholder='Password' secureTextEntry={true} placeholderTextColor={'#808B96'}
                        style={{ fontSize: 17, backgroundColor: '#EBF5FB', padding: 15, marginTop: 15 }}
                        onChangeText={(txt) => { setpasswd(txt) }}
                    />
                    <TextInput placeholder='Comfirm Password' secureTextEntry={true} placeholderTextColor={'#808B96'}
                        style={{ fontSize: 17, backgroundColor: '#EBF5FB', padding: 15, marginTop: 15 }}
                        onChangeText={(txt) => { setrePasswd(txt) }}
                    />

                </View>

                <View>
                    <Text
                        style={{
                            fontSize: 15,
                            alignSelf: 'flex-end',
                            marginTop: 15,
                            color: '#000',
                            fontWeight: 'bold'
                        }}
                    >Forgot your password</Text>
                </View>

                <TouchableOpacity onPress={SignUp} activeOpacity={0.7} style={{ padding: 20, backgroundColor: '#0008C1', borderRadius: 15, marginTop: 30 }}>
                    <Text
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >SIGN UP</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', padding: 5, justifyContent: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 16 }}>Alreacly have an account?</Text>
                    <TouchableOpacity activeOpacity={0.6} onPress={Login}>
                        <Text style={{ fontWeight: 'bold', marginLeft: 5, color: '#5BC0F8', fontSize: 16 }}> Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({})