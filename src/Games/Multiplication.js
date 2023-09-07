import { useEffect, useRef, useState } from "react";
import Button from "../Components/Button";
import Question from "../Components/Question";
import { Utilities } from "../Helpers/Utilities";
import RangeForm from "../Components/RangeForm";
import Counter from "../Components/Counter";

function Multiplication() {

  const maxTime = 120000;
  const minValue = useRef(2);
  const maxValue = useRef(3);


  const [points, setPoints] = useState(0);
  const [errors, setErrors] = useState(0);
  const[started, setStarted] = useState(false);
  const[gameNo, setGameNo] = useState(1);

  const [quest, setQuest] = useState({});
  const [numbers, setNumbers] = useState([]);

  useEffect(StartNewGame,[]);

  return (
    <div className="container">
      <div className="row">
        <RangeForm className="col-md-6" min={minValue.current} max={maxValue.current} onValueChanged={HandleValuesChanged} />
        <Counter maxtime={maxTime} started={started} onFinished={() => setStarted(false)} key={gameNo}/>
      </div>
      <div className={`card text-center mt-4 ${!started ? "is-disabled" :""}`}>
        <div className="card-header" style={{background: '#9fcbe0'}}>
          <Question firstNum={quest.firstNum} secondNum={quest.secondNum}/>
        </div>
        <div className="card-body" >
          {numbers.map((n, i) => (
            <Button value={n.num} index={i} selected={n.selected} key={i} answer={quest.answer} onAnswer={HandleButton} />
          ))}
        </div>
      </div>
      <div className="row mt-3">
        <h2 className="text-success">Точки: {points}</h2>
        <h2 className="ml-4 text-danger">Грешки: {errors}</h2>
      </div>
    </div>
  );

 
  function HandleValuesChanged(min, max) {
    minValue.current = min;
    maxValue.current = max;
    setPoints(0);
    setErrors(0);
    setGameNo(gameNo+1);
    setStarted(true);
  }
 
  function HandleButton(i) {
    const ans = numbers[i];
    numbers[i] = {...ans, selected:true};
    if (ans.num === quest.answer) {
      setPoints((p) => p + 1);
      setTimeout(StartNewGame,150);
    } else {
      setErrors((p) => p + 1);
    }
  }

  function StartNewGame() {
    const newQuest = Utilities.GenerateQuestion(minValue.current, maxValue.current);
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
