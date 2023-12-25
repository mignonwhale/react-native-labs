import { GestureHandlerRootView } from "react-native-gesture-handler";

import UseReducer from "./components/UseReducer.js";
import UseReducerBefore from "./components/UseReducerBefore.js";
import CustomHooks from "./components/CustomHooks.js";
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <UseReducerBefore /> */}
      {/* <UseReducer /> */}
      <CustomHooks />
    </GestureHandlerRootView>
  );
}
