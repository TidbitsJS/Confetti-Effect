import React, { useState, useEffect } from "react";
import AOS from "aos";
import "./Animations/letteranimation";
import "./Animations/cssanimation.min.css";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import "aos/dist/aos.css";
import "./App.css";

const drawStar = (ctx) => {
  const numPoints = this.numPoints || Math.random(4, 16);
  this.numPoints = numPoints;
  const outerRadius = this.w;
  const innerRadius = outerRadius / 2;
  ctx.beginPath();
  ctx.moveTo(0, 0 - outerRadius);

  for (let n = 1; n < numPoints * 2; n++) {
    const radius = n % 2 === 0 ? outerRadius : innerRadius;
    const x = radius * Math.sin((n * Math.PI) / numPoints);
    const y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
    ctx.lineTo(x, y);
  }
  ctx.fill();
  ctx.closePath();
};

const App = () => {
  const [party, setParty] = useState(false);
  const [newYear, setNewYear] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });

    AOS.refresh();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        width: width,
        height: height,
      }}
    >
      <Confetti
        width={width}
        height={height}
        numberOfPieces={party ? 500 : 0}
        recycle={false}
        onConfettiComplete={(confetti) => {
          setParty(false);
          confetti.reset();
        }}
        confettiSource={{
          w: 10,
          h: 10,
          x: width / 2,
          y: height / 2,
        }}
      />
      <h1 className="new-year cssanimation sequence effect3d lePushReleaseFrom">
        {newYear ? (
          <>
            <span className="happy">Happy</span>
            <span className="new">New</span>
            <span className="year">Year</span>
            <span className="year2021">2021</span>
          </>
        ) : null}
      </h1>
      <img
        src="https://img.icons8.com/emoji/96/000000/-emoji-ribbon.png"
        onClick={() => {
          setParty(!party);
          setNewYear(true);
        }}
        alt="ribbon"
        className="ribbon"
      />
      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        // drawShape={drawStar}
      />
      <div className="made-with">
        <p>Made with ❤️ ~ Sujata</p>
      </div>
    </div>
  );
};

export default App;
