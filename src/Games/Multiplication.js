import { useState } from "react";
import Button from "../Components/Button";
import Question from "../Components/Question";
import { Utilities } from "../Helpers/Utilities";

function Multiplication() {
  const [minValue, setMin] = useState(2);
  const [maxValue, setMax] = useState(2);

  const quest = GenerateQuestion(minValue, maxValue);
  const points = 3;

  return (
    <div className="container">
      <form className="form-inline">
        <div className="form-group">
          <label className="mr-1" for="mininput">От: </label>
          <input className="form-control x-sm-m3" id="mininput" value={minValue} onChange={(e) => setMin(e.target.value)} />
          <label className="mr-1 ml-4">До:</label>
          <input className="form-control x-sm-3" value={maxValue} onChange={(e) => setMax(e.target.value)} />
        </div>
      </form>
      <Question question={quest} />
      <div className="row d-flex justify-content-center">
        {GenerateNumbers(quest.firstNum, 3).map((n) => (
          <Button value={n} answer={quest.answer} />
        ))}
      </div>
      <div className="row">
        <h1>Точки: {points}</h1>
      </div>
    </div>
  );
}

function GenerateNumbers(first, max) {
  const nums = [];
  let second = Utilities.RandomNumber(10);
  for (let i = 0; i < 10; i++) {
    nums.push(first * second);
    second++;
    if (second === 11) {
      second = 1;
    }
  }
  first++;
  const index = Utilities.RandomNumber(9);
  nums.splice(index, 0, first * 4, first * 5);
  return nums;
}

function GenerateQuestion(min, max) {
  const question = {};
  question.firstNum = Utilities.RandomNumber(max, min);
  question.secondNum = Utilities.RandomNumber(10);
  question.answer = question.firstNum * question.secondNum;
  return question;
}

export default Multiplication;
