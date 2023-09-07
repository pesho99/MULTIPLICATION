import { useState, useRef, useEffect } from "react";
import { Utilities } from "../Helpers/Utilities";
import RangeForm from "../Components/RangeForm";
import GeneratedQuestion from "../Components/GeneratedQuestion";

function Generation() {
  const numQuestions = 12;

  const minValue = useRef(2);
  const maxValue = useRef(3);

  const [questions, setQuestions] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(GenerateQuestions, []);

  return (
    <div className="container">
      <div className="row">
        <RangeForm className="col-md-6" min={minValue.current} max={maxValue.current} onValueChanged={HandleMinMaxChanged} />
      </div>
      <div className="mt-4">
        {questions.map((q, i) => (
            <div className="row" key={i}>
          <GeneratedQuestion firstNum={q.firstNum} secondNum={q.secondNum} answer={q.answer} answered={q.answered} correct={q.correct} index={i} onAnswered={HandleAnsered}/>
          <hr></hr>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" disabled={finished} onClick={Check}>Провери</button>
    </div>
  );

  function Check()
  {
    setFinished(true);
    const newq = questions.map((q) => ({...q, answered: true}));
    setQuestions(newq);
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
    GenerateQuestions();
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
