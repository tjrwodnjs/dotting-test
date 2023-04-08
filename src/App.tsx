import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrushMode, Dotting, DottingRef, useBrush, useDotting } from "dotting";

function App() {
  const ref = useRef<DottingRef>(null);
  const { changeBrushMode } = useBrush(ref);
  const { undo } = useDotting(ref);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyZ" && (e.ctrlKey || e.metaKey)) {
        console.log("hi");
        undo();
      }
    });
  }, [undo]);
  return (
    <div className="App">
      <header className="App-header">
        <Dotting width={300} height={300} ref={ref} />
        {/* <Artboard tool={brush} style={{ width: 800, height: 600 }} /> */}
        <p
          onClick={() => {
            changeBrushMode(BrushMode.ERASER);
          }}
        >
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
