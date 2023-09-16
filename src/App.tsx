import { useEffect, useRef, useState, useCallback } from "react";
import {
  CanvasHoverPixelChangeHandler,
  Dotting,
  DottingRef,
  PixelModifyItem,
  useBrush,
  useData,
  useDotting,
  useGrids,
  useHandlers,
} from "dotting";

import { shape_I, shape_L, shape_T } from "./Font/Test";
function App() {
  const ref = useRef<DottingRef>(null);
  const { colorPixels, setData } = useDotting(ref);
  const { indices, dimensions } = useGrids(ref);
  const { dataArray } = useData(ref);

  const {
    addHoverPixelChangeListener,
    removeHoverPixelChangeListener,
    addCanvasElementEventListener,
    removeCanvasElementEventListener,
  } = useHandlers(ref);
  const [hoveredPixel, setHoveredPixel] = useState<{
    rowIndex: number;
    columnIndex: number;
  } | null>(null);

  const CreateEmptySquareData = (
    size: number
  ): Array<Array<PixelModifyItem>> => {
    const data: Array<Array<PixelModifyItem>> = [];
    for (let i = 0; i < size; i++) {
      const row: Array<PixelModifyItem> = [];
      for (let j = 0; j < size; j++) {
        row.push({ rowIndex: i, columnIndex: j, color: "" });
      }
      data.push(row);
    }
    return data;
  };

  useEffect(() => {
    const hoverPixelChangeListener: CanvasHoverPixelChangeHandler = (pixel) => {
      const { indices } = pixel;
      if (indices) {
        setHoveredPixel(indices);
      } else {
        setHoveredPixel(null);
      }
    };
    addHoverPixelChangeListener(hoverPixelChangeListener);
    return () => {
      removeHoverPixelChangeListener(hoverPixelChangeListener);
    };
  }, [addHoverPixelChangeListener, removeHoverPixelChangeListener]);

  useEffect(() => {
    const onCanvasClickListener = () => {
      // TASK: Make a firework effect when the user clicks on the canvas.
      // HINT1: You can use the `colorPixels` function to change the color of a pixel.
      // HINT2: You must know the boundaries of the current pixel canvas to take into considuration of the extent of the firework effect.
      // HINT3: You can use the indices and dimensions variables to get the boundaries of the current pixel canvas.
      // Check out the documentation for more information:
      // URL1: https://hunkim98.github.io/dotting/?path=/story/hooks-usedotting--page
      // URL2: http://localhost:6005/?path=/story/hooks-usegrids--page
      // Do not modify any parts other than the below.
      // Modifiy ⬇️
      // Modify ⬆️
    };
    addCanvasElementEventListener("mousedown", onCanvasClickListener);
    return () => {
      removeCanvasElementEventListener("mousedown", onCanvasClickListener);
    };
  }, [
    addCanvasElementEventListener,
    removeCanvasElementEventListener,
    hoveredPixel,
    indices,
    colorPixels,
    dimensions,
  ]);

  const handleKeyPress = useCallback((event: any) => {
    console.log(`Key pressed: ${event.key}`);
    if (event.key == "i" || event.key == "I") setData(shape_I);
    if (event.key == "l" || event.key == "L") setData(shape_L);
    if (event.key == "t" || event.key == "T") setData(shape_T);
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div
      style={{
        backgroundColor: "#282c34",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        position: "relative",
      }}
    >
      {hoveredPixel && (
        <div
          style={{
            position: "absolute",
            transform: "translate(50%, 50%)",
            right: "50%",
            top: "10px",
          }}
        >
          You are hoveing rowIndex: {hoveredPixel.rowIndex}, columnIndex:{" "}
          {hoveredPixel.columnIndex}
        </div>
      )}
      <Dotting
        width={1000}
        height={800}
        ref={ref}
        initLayers={[{ id: "layer1", data: CreateEmptySquareData(28) }]}
      />
      <div>
        <button
          onClick={() => {
            setData(CreateEmptySquareData(28));
          }}
        >
          CLEAR
        </button>
        <button
          onClick={() => {
            console.log(dataArray);
          }}
        >
          PRINT
        </button>
      </div>
    </div>
  );
}

export default App;
