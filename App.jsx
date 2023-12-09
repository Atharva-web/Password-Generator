import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  // we can also add all caps, no caps, mixture of both
  const [password, setPassword] = useState("");

  // useRef hook
  // const passwordRef = useRef(null);


  const passwordGenerator = useCallback(
    () => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) str += "0123456789";
      if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length);
        pass += str[char];
      }

      setPassword(pass);
    },
    
    [length, numberAllowed, charAllowed, setPassword] // if there is any change in these dependecies, this function will run again
  );


  const copyToClipboard = useCallback(
    () => {
      window.navigator.clipboard.writeText(pakssword);
      alert("copied to clipboard")
    },
    [password]
  )
  

  useEffect(
    () => passwordGenerator(),
    [length, numberAllowed, charAllowed, passwordGenerator]
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <div className="text-white text-center text-4xl my-6">
          Password generator
        </div>
        <div className="flex shadow rounded-lg overflow-x: visible mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipboard} className="outline-none bg-blue-700 hover:bg-sky-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={40}
              value={length} // value without an onChange event handler raises a warning
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              id="numberInput"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
              id="characterInput"
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
      <button
        className="text-orange-500 w-full max-w-sm"
        style={{ marginLeft: 389 }}
        onClick={passwordGenerator}
      >
        Regenerate
      </button>
    </>
  );
}

export default App;