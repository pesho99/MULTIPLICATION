
export default function Button({index, value, answer, selected, onAnswer, }) {
  const className = selected === false ? "btn-primary" : value === answer ? "btn-success" : "btn-danger";

  function handleClicked()
  {
      onAnswer(index);
  }
  return (
    <button className={`col-md-3 btn btn-lg m-2 ${className}`} disabled={selected} onClick={handleClicked}>
      <h3>{value}</h3>
    </button>
  );
}
