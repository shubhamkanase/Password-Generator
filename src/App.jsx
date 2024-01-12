import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setLength] = useState(8);

  const [numAllowed, setNumAllowed] = useState(false);

  const [charAllowed, setCharAllowed] = useState(false);

  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenarator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()+{}[]:?/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(Password)
  }
  ,[Password])

  useEffect(() => {
    passwordGenarator()
  }, [length, numAllowed, charAllowed, passwordGenarator])

  return (
    <>
    <div class="flex items-center justify-center h-screen">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 pb-9">
        <h1 className='text-white text-center my-9 text-3xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden md-4 pb-5'>
          <input type="text"
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly 
            ref={passwordRef}
            />
            
          <button onClick={copyPassword} 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-md gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={20}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label> Length: {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">characters</label>

          </div>
        </div>
      </div>
      </div>
    </>

  )
}

export default App
