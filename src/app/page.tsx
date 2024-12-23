"use client";

import { ReactElement, useState, useEffect } from "react";

export default function Home() {
  // Define a numbers array called drawnedNumbers
  const [drawnedNumbers, setDrawnedNumbers] = useState<number[]>([]);
  const [lastNumber, setLastNumber] = useState<number>(0);

  // Function to draw a random number that is not in the drawnedNumbers array
  function drawNumber() {
    if (drawnedNumbers.length === 75) {
      alert("All numbers have been drawn");
      return;
    }
    let number: number;
    do {
      number = Math.floor(Math.random() * 75) + 1;
    } while (drawnedNumbers.includes(number));
    setLastNumber(number);
    setDrawnedNumbers([...drawnedNumbers, number]);
  }

  // Function to reset the drawnedNumbers array
  function reset() {
    setDrawnedNumbers([]);
  }

  function numbers(
    start: number,
    drawnedNumbers: number[],
    color: string
  ): ReactElement[] {
    const result: ReactElement[] = [];
    for (let i = start; i < start + 15; i++) {
      const wasDrawned: boolean = drawnedNumbers.includes(i);
      const className = ["bingo_ball", `bingo_ball__${color}`];
      if (wasDrawned) {
        className.push("selected");
      }
      result.push(
        <span key={i} className={className.join(" ")}>
          {i}
        </span>
      );
    }
    return result;
  }

  useEffect(() => {
    if (lastNumber === undefined || lastNumber === 0) {
      return;
    }
    let file: string = "";
    if (lastNumber < 16) {
      file = "B";
    } else if (lastNumber < 31) {
      file = "I";
    } else if (lastNumber < 46) {
      file = "N";
    } else if (lastNumber < 61) {
      file = "G";
    } else {
      file = "O";
    }
    const audio = new Audio(`/sounds/${file}.${lastNumber}.mp3`);
    audio.play();
  }, [lastNumber]);

  return (
    <div className="container">
      <aside>
        <button
          type="button"
          className="bingo_button"
          onClick={drawNumber}
          disabled={drawnedNumbers.length === 75}
        >
          Sortear
        </button>

        <button type="button" className="bingo_button" onClick={reset}>
          Recomeçar
        </button>

        <div>
          <h3>Última pedra</h3>
          <p className="bingo_ball selected last-number">
            {lastNumber > 0 && lastNumber}
          </p>
        </div>
      </aside>

      <main id="bingo_table">
        <h2 className="bingo_ball selected">B</h2>
        <h2 className="bingo_ball selected">I</h2>
        <h2 className="bingo_ball selected">N</h2>
        <h2 className="bingo_ball selected">G</h2>
        <h2 className="bingo_ball selected">O</h2>
        <div>{numbers(1, drawnedNumbers, "red")}</div>
        <div>{numbers(16, drawnedNumbers, "green")}</div>
        <div>{numbers(31, drawnedNumbers, "blue")}</div>
        <div>{numbers(46, drawnedNumbers, "purple")}</div>
        <div>{numbers(61, drawnedNumbers, "orange")}</div>
      </main>
    </div>
  );
}
