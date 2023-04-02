import {FlatList,ScrollView,StyleSheet,Text,View,StatusBar,ActivityIndicator, 
    SafeAreaView,RefreshControl,TouchableOpacity,Share,Alert,Image
    } from 'react-native'
    import React, { useState } from 'react';
    import Icon from 'react-native-vector-icons/FontAwesome'
    import { useNavigation } from '@react-navigation/native';

const HomeScreen = (props) => {
    const navigation = useNavigation();

    const [isLoading, setisLoading] = useState(true);
    const [dssp, setdssp] = useState([]);
    const [reload, setreload] = useState(false);
  
    const Comment = () => {
      navigation.navigate('Comment');
    }
  
    const ShareList = async ({ item }) => {
      try {
        const result = await Share.share({
          message: "Share bài viết"
        });
  
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
            item.title;
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
  
      } catch (error) {
        console.log(error);
      }
    }
  
    const reloadData = React.useCallback(() => {
      setreload(true);
      getListSP();
      setTimeout(() => {
        setreload(false);
      }, 2000)
    });
  
    const getListSP = async () => {
      let url_data = "http://10.24.48.202:3000/tb_posts";
  
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
  
    const renderDs = ({ item }) => {
  
      const Delete = () => {
  
        let api_api_del = "http://10.24.48.202:3000/tb_posts/" + item.id;
        fetch(api_api_del, {
  
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
        })
          .then((res) => {
            if (res.status == 200)
              alert("Xóa thành công");
            getData();
  
          })
          .catch((err) => {
            console.log(err);
          });
      }
  
      const ShowDialogDelete = () => {
        Alert.alert("Thông báo", "Bạn có muốn xóa bài viết này không?",
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
  
      const update=() =>{
        props.navigation.navigate("Update",{item_post:item});
      }
      return (
        <View style={styles.header}>
          <ScrollView>
            <View style={styles.khung}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
  
                <View style={{ marginRight: 125 }}>
                  <Text style={styles.ten}>{item.title}</Text>
                </View>
                
                <TouchableOpacity activeOpacity={0.5} onPress={
                  update
                  }>
                  <Icon name='edit' size={22} />
                </TouchableOpacity>
  
                <TouchableOpacity activeOpacity={0.5} onPress={ShowDialogDelete}>
                  <Icon name='trash' size={22} />
                </TouchableOpacity>
  
              </View>
              <Text>{item.content}</Text>
  
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Image style={{ width: 250, height: 150, borderRadius: 10 }} source={{ uri: item.image }} />
              </View>
  
              <View style={{ borderBottomWidth: 1, marginTop: 10, borderColor: '#BDC3C7' }}>
  
              </View>
  
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={Comment} style={{ marginLeft: 50 }}>
                  <View style={{ flexDirection: 'row', padding: 5, width: 100, borderRadius: 10, marginTop: 10 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                      <Icon name='comment' size={17} />
  
                    </View>
                    <View>
                      <Text style={{ fontWeight: '600' }}>Comment</Text>
                    </View>
                  </View>
                </TouchableOpacity>
  
                <TouchableOpacity style={{ marginLeft: 50 }} onPress={ShareList}>
                  <View style={{ flexDirection: 'row', padding: 5, width: 100, borderRadius: 10, marginTop: 10 }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                      <Icon name='share' size={17} />
                    </View>
                    <View>
                      <Text style={{ marginLeft: 4, fontWeight: '600' }}>Share</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  
    React.useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', () => {
        getListSP();
      });
  
      return unsubscribe;
    }, [props.navigation]);
  return (
    <View style={{ backgroundColor: '#E5E7E9', height: 600 }}>

      <View style={styles.headers}>
        <Text style={styles.logo}>Danh Sách Sân Bóng</Text>
      </View>

      <SafeAreaView>
        <ScrollView refreshControl={
          <RefreshControl refreshing={reload}
            onRefresh={reloadData} />
        }>
          <FlatList data={dssp}
            keyExtractor={(item_ds) => { return item_ds.id }}
            renderItem={renderDs}
          />
        </ScrollView>
      </SafeAreaView>
      <StatusBar />
    </View>
  )
}

export default HomeScreen;
const styles = StyleSheet.create({

    khung: {
      padding: 10,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: 13,
      elevation: 10
    },
    ten: {
      fontSize: 19,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 5
    },
    header: {
      padding: 15,
    },
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
      fontWeight: '800',
      color: 'red'
    }
  })