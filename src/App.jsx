import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import CounterConfigure from "./components/Counter/ConfigureCounter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
    setChosenCount((prevChosesnCount) => prevChosesnCount + 1);

    // state batching => 같은 함수 내에서 여러 state 업데이트가 있을 때 다같이 배칭되어서 한번의 컴포넌트 함수 실행을 유도한다.
    console.log(chosenCount);
  }

  return (
    <>
      <Header />
      <main>
        <CounterConfigure onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;

// 리액트는
// 가상 DOM을 사용해서 실제 DOM의 어떤 부분들이 업데이트 되어야하는지 찾는다.
// 가상돔을 사용하면 이는 메모리 안에서만 존재하고 실제 DOM을 사용하는것 보다 빠르기 때문이다
