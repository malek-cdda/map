"use client";

import { useState } from "react";

const Home = () => {
  const [color, setColor] = useState({});
  const [state, setState] = useState([]);
  const [value, setValue] = useState<any>([{}]);
  const handleStyle = (e: any) => {
    setValue([...value, { names: e.target }]);
  };
  console.log(value);
  return (
    <div>
      <h1
        className="header2"
        id="header1"
        style={color}
        onClick={(e: any) => handleStyle(e)}
      >
        this is name
      </h1>
      <h2
        className="header2"
        id="header2"
        style={color}
        // onClick={(e) => setValue([...value,name:e.target.value])}
        onClick={(e: any) => handleStyle(e)}
      >
        heading 2
      </h2>
      <button
        onClick={() => {
          setColor({ color: "red" });
        }}
      >
        red
      </button>
    </div>
  );
};

export default Home;
