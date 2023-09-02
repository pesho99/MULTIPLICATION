import { Utilities } from "../Helpers/Utilities";


export default function Question({ question }) {
  const text = Utilities.RandomNumber(2) ===  2 ? `${question.secondNum}x${question.firstNum}` : `${question.firstNum}x${question.secondNum}`;
  return <h1 className="mb-5 text-center">{text}</h1>;
}
