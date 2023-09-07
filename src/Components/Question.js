import { useRef } from "react";
import { Utilities } from "../Helpers/Utilities";


export default function Question({ firstNum, secondNum }) {
  const isFirst = useRef(() => Utilities.RandomNumber(2) === 2,[]);
  return isFirst ?  <h1>{`${firstNum}x${secondNum}`}</h1> :  <h1>{`${secondNum}x${firstNum}`}</h1>;
}
