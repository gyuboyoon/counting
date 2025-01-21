import { useState } from "react";

import { log } from "../../log.js";

function HistoryItem({ count }) {
  log("<HistoryItem /> rendered", 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? "selected" : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log("<CounterHistory /> rendered", 2);

  return (
    <ol>
      {history.map((count) => (
        <HistoryItem key={count.id} count={count.value} />
        // 키가 list(<li>)에서 유용한 이유
        // 리액트에서 key는 상태를 구체적인 컴포넌트 인스턴스에 매핑할 때 고려되는 다른 요소이다.
        // 키값이 있으면 state가 건너뛰는것을 방지할 수 있다. = 다른 요소들은 업데이트 되지않고 필요한 요소만 업데이트 된다.
      ))}
    </ol>
  );
}
