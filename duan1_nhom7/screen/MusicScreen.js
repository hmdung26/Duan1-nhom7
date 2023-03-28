import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import * as React from "react";


const { height, width } = Dimensions.get("window");
const MusicScreen = (props) => {
  const renderMusic = ({ item }) => {
    return (
      <View>
        <TouchableOpacity style={styles.container1}>
          <Image source={item.image} style={styles.songImg} />

          <View style={styles.nameView}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.name}>{item.singer}</Text>
          </View>

          <TouchableOpacity>
            <Image
              source={require("../assets/image/play.png")}
              style={styles.play}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>MUSIC</Text>
      </View>

      <FlatList data={songs} renderItem={renderMusic} />
    </View>
  );
};

export default MusicScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "#fff",
    width: "100%",
    elevation: 5,
    justifyContent: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "700",
    color: "red",
    marginLeft: 20,
  },
  container1: {
    width: width - 20,
    height: 100,
    elevation: 5,
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
  },
  songImg: {
    width: 100,
    height: 90,
    borderRadius: 10,
    marginLeft: 5,
  },
  nameView: {
    paddingLeft: 15,
    width: "58%",
    marginTop: 13,
  },
  name: {
    fontSize: 19,
    fontWeight: "500",
    color: "#000",
    margin: 2,
  },
  play: {
    width: 30,
    height: 30,
    marginTop: 28,
  },
});
