import { GestureHandlerRootView } from "react-native-gesture-handler";

import UseReducer from "./hooks/UseReducer.js";
import UseReducerBefore from "./hooks/UseReducerBefore";
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <UseReducerBefore /> */}
      <UseReducer />
    </GestureHandlerRootView>
  );
}
