import Multiplication from "./Games/Multiplication";
import Header from "./Components/Header";
import Generation from "./Games/Generation";

function App() {
  const game = "gen";
  return (
    <div>
      <Header />
      {game === "gen" && <Generation/>}
      {game === "mul" && <Multiplication/>}

    </div>
  );
}

export default App;
