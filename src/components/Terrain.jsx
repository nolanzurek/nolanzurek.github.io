import React from "react";
import { useEffect, useState } from "react";
import "./styles/terrainStyle.css";
import { createNoise2D } from "../utils/simplex-noise";

const height = 100;
const topGap = 200;
const bottomGap = 30;
const noiseDetail = 1 / 200;

const Terrain = (props) => {
  const [generationCount, setGenerationCount] = useState(0);
  useEffect(() => {
    function drawTree(x, y) {
      y = y - 50;
      const canvas = document.getElementById("terrainCanvas");
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = `rgb(${40 + Math.random() * 15}, ${
        110 + Math.random() * 15
      },${40 + Math.random() * 15})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 30, y - 100);
      ctx.lineTo(x + 60, y);
      ctx.closePath();
      ctx.fill();
      //draw tree trunk
      ctx.fillStyle = `rgb(${50 + Math.random() * 15}, ${
        25 + Math.random() * 15
      },${20 + Math.random() * 15})`;
      ctx.beginPath();
      ctx.moveTo(x + 25, y);
      ctx.lineTo(x + 25, y + 100);
      ctx.lineTo(x + 35, y + 100);
      ctx.lineTo(x + 35, y);
      ctx.closePath();
      ctx.fill();
    }

    // //getting the colors for the terrain from the css file
    // const terrainStyle = getComputedStyle(document.body);

    // const dirtColor = terrainStyle.getPropertyValue("--accent2");
    // const grassColor = terrainStyle.getPropertyValue("--accent1-lighter");
    // const treeColor = terrainStyle.getPropertyValue("--accent1");
    // const trunkColor = terrainStyle.getPropertyValue("--accent2-dark");
    // const skyColor = terrainStyle.getPropertyValue("--background");

    const noise2D = createNoise2D();

    let noiseData = [];
    for (let i = 0; i < props.width; i++) {
      noiseData[i] = (noise2D(1, i * noiseDetail) + 1) * height * 0.5;
    }

    const canvas = document.getElementById("terrainCanvas");
    const ctx = canvas.getContext("2d");
    // ctx.fillStyle = skyColor;
    // ctx.fillRect(0, 0, props.width, height + topGap + bottomGap);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < props.width; i += 3) {
      if (Math.random() > 0.9) {
        drawTree(i, height + topGap - noiseData[i] + Math.random() * 10);
      }
    }

    ctx.fillStyle = `rgb(120, 65, 40)`;
    for (let i = 0; i < props.width; i++) {
      ctx.fillRect(
        i,
        height + topGap - noiseData[i],
        1,
        noiseData[i] + bottomGap
      );
    }

    //draw the grass as circles at the terrain height
    for (let i = 0; i < props.width; i += 3) {
      ctx.fillStyle = `rgb(${80 + Math.random() * 15}, ${
        200 + Math.random() * 15
      },${80 + Math.random() * 15})`;
      let size = 15 + Math.random() * 10;
      ctx.beginPath();
      ctx.fillRect(
        i + Math.random() * 25 - 12.5 - size / 2,
        height + topGap - noiseData[i] + Math.random() * 25 - 12.5 - size / 2,
        size,
        size
      );
      ctx.fill();
    }
  }, [props.width, generationCount]);

  return (
    <canvas
      id="terrainCanvas"
      width={props.width}
      height={height + topGap + bottomGap}
      onClick={() => {
        setGenerationCount(generationCount + 1);
      }}
    ></canvas>
  );
};

export default Terrain;
