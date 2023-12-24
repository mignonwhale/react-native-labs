import { useReducer, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Todo from "./Todo";

/**
 * useReducer()
 *
 * [사용법]
 * const [state, dispatch] = useReducer(reducer, initialState);
 * dispatch(action);
 *
 * [구성]
 * - dispatch(): 리액트가 제공한 함수로 호출할 때 인자로 action를 넘겨주면 된다.
 * - action: state를 어떻게 할지 요청하는 내용이다. 원시값, 혹은 객체
 * - reducer(prevState, action): state에 대한 요청을 실제로 실행하는 콜백함수로
 *    리액트가 호출할때 인자로 지금 변경하기 직전의 state값과 내가 넘긴 action을 넘겨준다.
 *
 * [설명]
 * useState보다 복잡한 state 관리를 필요로 할때 유용하다.
 * useState처럼 state를 업데이트 해 준다.
 * state 변경관리를 한 곳에서 할 수 있다.
 */

// 컴포넌트는 함수이고 리렌더링이라는 것은 함수를 다시 호출하는 것을 말한다.
// 리렌더링 시 모든 변수, 함수가 초기화 되므로 아래와 같이 reducer 함수를 컴포넌트 밖으로 빼면
// 렌더링이 될때마다 매번 초기화를 거쳐 새로운 메모리에 할당 되지 않는다.
const reducer = (prevTodos, action) => {
  switch (action.type) {
    case "regist":
      const text = action.payload.text;
      const newTodo = { id: Date.now(), content: text };
      return [...prevTodos, newTodo];
    case "delete":
      console.log("oldTodos: ", prevTodos);
      return prevTodos.filter((todo) => todo.id !== action.payload.id);
    default:
      return prevTodos;
  }
};

export default () => {
  const [text, setText] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UseReducer</Text>
      <TextInput style={[styles.input, styles.text]} value={text} onChangeText={(text) => setText(text)} placeholder={"투두 입력"} />
      <Button
        title={"등록"}
        onPress={() => {
          dispatch({ type: "regist", payload: { text } });
          setText("");
        }}
      ></Button>
      {todos.map((todo) => (
        <Todo key={todo.id} id={todo.id} content={todo.content} dispatch={dispatch} />
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
