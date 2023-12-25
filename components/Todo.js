import { Button, Text, View, StyleSheet } from "react-native";
export default ({ id, content, dispatch }) => {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 10 }}>
      <Text style={styles.text}>{content}</Text>
      <Button
        title="삭제"
        onPress={() => {
          dispatch({ type: "delete", payload: { id } });
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 30 },
});
