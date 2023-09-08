import { useState, useRef, useEffect } from "react";
import { Utilities } from "../Helpers/Utilities";
import RangeForm from "../Components/RangeForm";
import GeneratedQuestion from "../Components/GeneratedQuestion";
import Counter from "../Components/Counter";


function Generation() {
  const numQuestions = 12;
  const maxTime = 180;

  const minValue = useRef(2);
  const maxValue = useRef(3);

  const [questions, setQuestions] = useState([]);
  const [finished, setFinished] = useState(false);
  const [gameNo, setGameNo] = useState(1);
  const[correct, setCorrect] = useState(0);

  useEffect(GenerateQuestions, []);

  return (
    <div className="container">
      <div className="row">
        <RangeForm className="col-md-6" min={minValue.current} max={maxValue.current} onValueChanged={HandleMinMaxChanged} />
        <Counter maxtime={maxTime*1000} started={!finished} onFinished={Check} key={gameNo}/>
      </div>
      <div className="mt-4">
        {questions.map((q, i) => (
            <div className="row" key={i}>
          <GeneratedQuestion firstNum={q.firstNum} secondNum={q.secondNum} answer={q.answer} answered={q.answered} correct={q.correct} key={gameNo*(i+1)} index={i} onAnswered={HandleAnsered}/>
          <hr></hr>
          </div>
        ))}
      </div>
      {!finished && <button className="btn btn-primary" onClick={Check}>Провери</button>}
      <h3>{finished && `Правилни Отговори: ${correct}`}</h3>
    </div>
  );

  function Check()
  {
    setFinished(true);
    const newq = questions.map((q) => ({...q, answered: true}));
    setQuestions(newq);
    setCorrect(questions.filter(q=>q.correct).length);
  }

  function HandleAnsered(index, firstNum, secondNum, answer)
  {
    const q = questions[index];
    const correct = q.firstNum === firstNum && q.secondNum === secondNum && q.answer === answer;
    var newq = questions.map((q,i)=> i === index ? {...q, correct: correct} : q)
    setQuestions(newq);
  }

  function HandleMinMaxChanged(min, max) {
    minValue.current = min;
    maxValue.current = max;
    setFinished(false);
    GenerateQuestions();
    setGameNo((g) => g+1);
    setCorrect(0);
  }

  function GenerateQuestions() {
    const quests = [];
    for (let i = 0; i < numQuestions; i++) {
      var q = Utilities.GenerateQuestion(minValue.current, maxValue.current);
      quests.push({...q, correct: false, answered: false});
    }
    setQuestions(quests);
  }
}

export default Generation;
