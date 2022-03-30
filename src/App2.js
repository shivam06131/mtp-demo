import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  if (data.length !== 0) {
    console.log(data);
  }
  const handleClick = () => {
    dispatch({ type: "USER_FETCH_REQUESTED", payload: "this is payload" });
  };

  //! mounting
  useEffect(() => {}, []);
  //! updating
  useEffect(
    () => {},
    [
      //some variable
    ]
  );
  return (
    <div className="App">
      <h1>Get some data </h1>
      <button onClick={handleClick}>get data </button>
    </div>
  );
}

export default App;
