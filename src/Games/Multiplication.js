import { useState } from "react";
import Button from "../Components/Button";
import Question from "../Components/Question";
import { Utilities } from "../Helpers/Utilities";
import RangeForm from "../Components/RangeForm";

function Multiplication() {
  const maxTime = 120000;
  const [minValue, setMin] = useState(2);
  const [maxValue, setMax] = useState(3);
  const [points, setPoints] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timeleft, setTime] = useState(0);
  const[timer, setTimer] = useState({});

  const newQuest = GenerateQuestion(minValue, maxValue);
  const nums = GenerateNumbers(newQuest.firstNum);
  const [quest, setQuest] = useState(newQuest);
  const [numbers, setNumbers] = useState(nums);
  return (
    <div className="container">
      <div className="row">
        <RangeForm className="col-md-6" min={minValue} max={maxValue} onValueChanged={HandleValuesChanged} />
        <h3 className="col-md-6 text-right">TIME: <span className="text-info">{ToSeconds(timeleft)}</span></h3>
      </div>
      <div className={`card text-center mt-4 ${timeleft === 0 ? "is-disabled" :""}`}>
        <div className="card-header" style={{background: '#9fcbe0'}}>
          <Question firstNum={quest.firstNum} secondNum={quest.secondNum} showFirst={quest.showFirst}/>
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

  function ToSeconds(time)
  {
    const date = new Date(time);
    return(`${date.getMinutes()}:${String(date.getSeconds()).padStart(2,'0')}`);
  }

  function HandleValuesChanged(min, max) {
    setMin(min);
    setMax(max);
    setPoints(0);
    setErrors(0);
    StartNewGame();
    clearInterval(timer);

    setTime(maxTime);
    const newTim = setInterval(() => {
        setTime((t) => t > 1000 ? t-=1000 : t=0);
    }, 1000);
    setTimeout(function( ) { clearInterval( newTim ); }, maxTime);
    setTimer(newTim);

  }
 
  function HandleButton(i) {
    const ans = numbers[i];
    if (ans.num === quest.answer) {
      setPoints((p) => p + 1);
      setNumbers((nums) => nums.map((num) => { return {...num, selected:true} } ));
      setTimeout(StartNewGame, 400);
    } else {
      ans.selected = true;
      setErrors((p) => p + 1);
    }
  }
  function GenerateQuestion(min, max) {
    const question = {};
    question.firstNum = Utilities.RandomNumber(max, min);
    question.secondNum = Utilities.RandomNumber(10);
    question.answer = question.firstNum * question.secondNum;
    question.showFirst = Utilities.RandomNumber(2) === 2;
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
