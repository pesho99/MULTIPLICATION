

export default function Question({ firstNum, secondNum, showFirst }) {
  const text = showFirst ? `${secondNum}x${firstNum}` : `${firstNum}x${secondNum}`;
  return <h1>{text}</h1>;
}
