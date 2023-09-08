import { useRef } from "react";
import { Utilities } from "../Helpers/Utilities";

export default function GeneratedQuestion({ firstNum, secondNum, answer, answered, correct,  index, onAnswered }) {

    const ans = useRef({firstNum: firstNum, secondNum: secondNum, answer: answer});
    const isFirst = useRef(Utilities.RandomNumber(2) === 2);
    const replaceAns = useRef(Utilities.RandomNumber(10) < 8);
    const style = answered ? correct ? "text-success" : "text-danger" : "";
  return (
    <div className={`row col-6 text-center ${style}`}>
      {isFirst.current ? FirstNum() :<div className="col-2"><h3> {secondNum} </h3></div>}
      <h3> X </h3>
      {isFirst.current ? <div className="col-2"><h3> {secondNum} </h3></div> : FirstNum()}
      <h3> = </h3>
      {Ans()}
    </div>
  );

  function HandleChange(isAns, value)
  {
    if (isAns)
    {
      ans.current = {...ans.current, answer: Number(value)};
    }
    else
    {
      ans.current = {...ans.current, firstNum: Number(value)};
    }
    onAnswered(index, ans.current.firstNum, ans.current.secondNum, ans.current.answer);
  }

  function FirstNum()
  {
    return ( <div className="col-2">{replaceAns.current ? <h3>{firstNum}</h3> : <input type="text" className="form-control" onChange={(e) => HandleChange(false, e.target.value)}/>}</div>);
  }
  function Ans()
  {
    return (<div className="col-2">{!replaceAns.current ? <h3>{answer}</h3> :  <input type="text" className="form-control" onChange={(e) => HandleChange(true, e.target.value)}/>}</div>);
  }
}
