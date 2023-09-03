import { Utilities } from "../Helpers/Utilities";


export default function Question({ firstNum, secondNum }) {
  const text = Utilities.RandomNumber(2) ===  2 ? `${secondNum}x${firstNum}` : `${firstNum}x${secondNum}`;
  return <h1 className="m-5 text-center">{text}</h1>;
}
