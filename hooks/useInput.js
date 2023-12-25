import { useState } from "react";

/**
 * TextInput의 value와 onChangeText를 연결해주는 커스텀 훅
 * @param {string} initialState 초기값
 * @returns {array} 반환되는 배열은 두 가지 요소를 포함한다.
 *   1. {string} inputValue - 변경된 state 값
 *   2. {function} handleChangeText - state를 변경할 함수
 */
export function useInput(initialState) {
  const [inputValue, setInputValue] = useState(initialState);
  const handleChangeText = (text) => setInputValue(text);
  return [inputValue, handleChangeText];
}
