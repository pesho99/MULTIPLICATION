import { useState } from "react";

export default function Button({ value, answer }) {
  const [clicked, setClicked] = useState(false);


  const className = clicked === false ? "btn-primary" : value === answer ? "btn-success" : "btn-danger";
  return (
    <button className={`col-md-3 btn btn-lg m-2 ${className}`} disabled={clicked} onClick={() => setClicked(true)}>
      <h3>{value}</h3>
    </button>
  );
}
