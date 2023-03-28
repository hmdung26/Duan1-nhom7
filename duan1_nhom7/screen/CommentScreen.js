import { View, Text } from "react-native";
import React from "react";

const CommentScreen = () => {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [dscm, setdscm] = useState([]);
  const [reLoading, setreLoading] = useState(false);

  const reloadingData = React.useCallback(() => {
    setreLoading(true);
    getList();

    setTimeout(() => {
      setreLoading(false);
    }, 2000);
  });

  const renderSP = ({ item }) => {
    return (
      <View style={style.khung}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              style={{ width: 35, height: 35, borderRadius: 50 }}
              source={{ uri: item.tb_users.image }}
            />
          </View>
          <Text style={{ fontSize: 19, marginLeft: 5, fontWeight: "600" }}>
            {item.tb_users.username}
          </Text>
        </View>
        <Text style={{ marginLeft: 40 }}>{item.comment}</Text>
      </View>
    );
  };

  React.useEffect(() => {
    getList();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View style={style.tieude}>
        <Text style={style.ten}>Comment</Text>
      </View>

      <View style={{ height: 550, marginTop: 20, padding: 5 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={reLoading} onRefresh={reloadingData} />
          }
        >
          <FlatList
            data={dscm}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={renderSP}
          />
        </ScrollView>
      </View>

      <View style={{ justifyContent: "flex-end", flex: 1, padding: 15 }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              borderWidth: 1,
              width: 300,
              padding: 10,
              borderRadius: 10,
              height: 50,
              backgroundColor: "white",
            }}
          >
            <TextInput placeholder="Comment" />
          </View>

          <TouchableOpacity style={{ marginLeft: 20 }}>
            <Icon name="send" size={45} color={"blue"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentScreen;
const style = StyleSheet.create({
  tieude: {
    backgroundColor: "white",
    padding: 10,
    width: "100%",
    elevation: 50,
  },
  ten: {
    textAlign: "center",
    fontSize: 27,
    fontWeight: "bold",
  },

  gui: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 13,
    color: "white",
  },
  khung: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    elevation: 15,
    backgroundColor: "white",
  },
});
