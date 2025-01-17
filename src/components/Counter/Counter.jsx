import { useState, memo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// 컴포넌트 함수의 속성을 살펴보고 컴포넌트 함수가 정상적으로 다시 실행될 때, 예를들어 앱 컴포넌트 함수가 실행되면 memo가 이전 속성 값과 새로 받을 속성 값을 살펴본다
// 만약 함수가 실행됐는데 속성 값들이 완전히 동일하다면 그말은 배열과 객체가 메모리안에 있는 배열과 객체와 동일하다는 뜻이다.
// 그럴경우 memo가 컴포넌트 함수 재실행을 저지한다.
// 이니셜 카운트가 변경되거나 내부적인 상태가 변경된다면  memo에 아무런 영향을 주지 않는다.
// memo는 오직 부모 컴포넌트, 즉 앱 컴포넌트에 의해 함수가 실행되었을때만 이를 저지한다.

// memo가 유용하기 때문에 모든 컴포넌트를 감싸는건 안된다.
// 최대한 상위 트리에 속한 컴포넌트를 감싸는건 가능하다.
// 그 컴포넌트가 재실행되는게 저지된다면, 모든 중첩 컴포넌트들 또한 재실행되지 않기 대문이다.
// 만약 모든 컴포넌트들을 감싼다면, 리액트는 컴포넌트 함수를 실행하기 전 항상 속성들을 확인해야 한다는것이 된다.
// 물론 속성값을 확인하는 것은 그만큼 성능에 부담을 주게 된다. 함수를 감쌀때 특히 문제가 된다.
// 항상 속성을 바꿔야 하기 때문이다. 그래서 이 비교는 항상 모든 컴포넌트 함수가 실행되어야 한다는 결과를 도출하게 된다.
const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);
  const initialCountIsPrime = isPrime(initialCount);

  const [counter, setCounter] = useState(initialCount);

  function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }

  function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;
