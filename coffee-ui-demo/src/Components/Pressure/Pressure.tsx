import React, { useEffect, useState } from "react";
import { roundPrecision } from "../../Utils";

interface Props {
  pressureValue: number;
}

export function Pressure({ pressureValue }: Props): JSX.Element {
  const [svgDots, setSvgDots] = useState([]);

  const createSvgToArc = (angle: number, radius: number, active: boolean) => {
    const x = 240 + 220 * Math.cos((-angle * Math.PI) / 180);
    const y = 240 + 220 * Math.sin((-angle * Math.PI) / 180);

    return (
      <circle
        key={angle}
        cx={x}
        cy={y}
        r={radius}
        fill={active ? "white" : "gray"}
      />
    );
  };

  useEffect(() => {
    createDotsInArc();
  }, [pressureValue]);

  const createDotsInArc = () => {
    const dots = [];
    let position = 210;

    const currentPressure = pressureValue
      ? roundPrecision(pressureValue, 2)
      : 0;

    for (let x = 1; x < 12; x++) {
      const active = currentPressure >= x + 2;

      dots.push(createSvgToArc(position, 3, active ? active : false));

      if (x < 11) {
        let tmpPosition = position;
        for (let y = 0.1; y < 0.9; y = y + 0.1) {
          tmpPosition = tmpPosition - 2.4;
          dots.push(
            createSvgToArc(tmpPosition, 1, currentPressure >= x + 2 + y)
          );
        }
      }

      position = position - 24;
    }
    setSvgDots(dots as []);
  };

  return (
    <>
      <svg height="480" width="480" style={{ position: "absolute" }}>
        {svgDots}
      </svg>
      <div className="container-pressure">
        <div className="pressure">
          {pressureValue !== undefined && pressureValue <= 9.9
            ? pressureValue.toPrecision(2)
            : pressureValue.toPrecision(3)}
        </div>
        <div className="text-gray text-rigth-bottom">bar</div>
      </div>
    </>
  );
}
