import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import TodoBefore from "./TodoBefore";

export default () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleRegistText = (_text) => {
    setTodos((prev) => [...prev, { id: Date.now(), content: _text }]);
    setText("");
  };

  const handleDelete = (id) => {
    setTodos((prev) => {
      return prev.filter((ele) => ele.id !== id);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UseReducerBefore</Text>
      <TextInput style={[styles.input, styles.text]} value={text} onChangeText={(text) => setText(text)} placeholder={"투두 입력"} />
      <Button title={"등록"} onPress={() => handleRegistText(text)}></Button>
      {todos.map((todo) => (
        <TodoBefore key={todo.id} id={todo.id} content={todo.content} handleDelete={handleDelete} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 70, paddingHorizontal: 18 },
  title: { fontSize: 50, fontWeight: "bold" },
  input: { borderWidth: 1 },
  text: { fontSize: 30 },
});
