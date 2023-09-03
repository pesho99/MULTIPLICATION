import { useState } from "react";
import Button from "../Components/Button";
import Question from "../Components/Question";
import { Utilities } from "../Helpers/Utilities";
import RangeForm from "../Components/RangeForm";

function Multiplication() {
  const [minValue, setMin] = useState(2);
  const [maxValue, setMax] = useState(3);
  const [points, setPoints] = useState(0);
  const [errors, setErrors] = useState(0);

  const newQuest = GenerateQuestion(minValue, maxValue);
  const nums = GenerateNumbers(newQuest.firstNum);
  const [quest, setQuest] = useState(newQuest);
  const [numbers, setNumbers] = useState(nums);

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <RangeForm min={minValue} max={maxValue} onValueChanged={HandleValuesChanged} />
      </div>
      <Question firstNum={quest.firstNum} secondNum={quest.secondNum} />
      <div className="row d-flex justify-content-center">
        {numbers.map((n, i) => (
          <Button value={n.num} index={i} selected={n.selected} key={i} answer={quest.answer} onAnswer={HandleButton} />
        ))}
      </div>
      <div className="row">
        <h2 className="text-success">Точки: {points}</h2>
        <h2 className="ml-4 text-danger">Грешки: {errors}</h2>
      </div>
    </div>
  );

  function HandleValuesChanged(min, max) {
    setMin(min);
    setMax(max);
    setPoints(0);
    setErrors(0);
    StartNewGame();

  }

  function HandleButton(i) {
    const ans = numbers[i];
    ans.selected = true;

    if (ans.num === quest.answer) {
      setPoints((p) => p + 1);
      StartNewGame();
    } else {
      setErrors((p) => p - 1);
    }
  }
  function GenerateQuestion(min, max) {
    const question = {};
    question.firstNum = Utilities.RandomNumber(max, min);
    question.secondNum = Utilities.RandomNumber(10);
    question.answer = question.firstNum * question.secondNum;
    return question;
  }

  function StartNewGame() {
    const newQuest = GenerateQuestion(minValue, maxValue);
    const nums = GenerateNumbers(newQuest.firstNum);
    setQuest(newQuest);
    setNumbers(nums);
  }
}

function GenerateNumbers(first) {
  const nums = [];
  let second = Utilities.RandomNumber(10);
  for (let i = 0; i < 10; i++) {
    nums.push({ num: first * second, selected: false });
    second++;
    if (second === 11) {
      second = 1;
    }
  }
  first++;
  const index = Utilities.RandomNumber(0, 9);
  nums.splice(index, 0, { num: first * 4, selected: false }, { num: first * 5, selected: false });
  return nums;
}

export default Multiplication;
