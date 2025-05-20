import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0)

    function increase(){
        setCount(count + 1);
    }

    function reset(){
        setCount(0)
    }

    function decrease(){
        count > 0 ? setCount(count - 1) : setCount(0)
    }

  return (
    <>
      <h2>Counter App</h2>
      <h1>{count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={reset}>Reset</button>
      <button onClick={decrease}>Decrease</button>
    </>
  )
}

export default Counter