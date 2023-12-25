import { StyleSheet, Text, TextInput, View } from "react-native";
import { useInput } from "../hooks/useInput";

export default () => {
  // 커스텀 훅을 사용하면 아래와 같이 코드를 간결하게 작성할 수 있다.
  // useInput
  const [inputValue, handleChangeText] = useInput("");
  const [inputValue1, handleChangeText1] = useInput("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Hooks</Text>
      <Text style={styles.text}>1. useInput</Text>
      <TextInput style={[styles.input, styles.text]} placeholder="첫번째 인풋" value={inputValue} onChangeText={handleChangeText} />
      <TextInput style={[styles.input, styles.text]} placeholder="두번째 인풋" value={inputValue1} onChangeText={handleChangeText1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 70, paddingHorizontal: 18 },
  title: { fontSize: 50, fontWeight: "bold" },
  input: { borderWidth: 1, marginBottom: 20 },
  text: { fontSize: 30, marginBottom: 10 },
});
