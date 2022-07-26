import React, { useEffect, useState } from "react";
// import { Pressure } from "../../Components/Pressure/Pressure";
import { roundPrecision } from "../../Utils";
import "../../index.css";

const wss = new WebSocket("ws://localhost:8080");

const startSimulation = {
  type: "start_simulation",
}


interface SensorReads {
  temperature: number;
  pressure: number;
  flow: number;
  weight: number;
  }


export default function () {
  const [sensorReads, setSensorReads] = useState<SensorReads>({flow: 1, pressure: 9, temperature: 90, weight: 0});
  const { temperature, pressure, flow, weight } = sensorReads;
  useEffect(() => {
    wss.onopen = function (event) {
      console.log("conected...");
      wss.send(JSON.stringify(startSimulation));
      wss.onmessage = function (event) {
        const readings = JSON.parse(event.data);
        setSensorReads(readings);
      }
    }
  }, [])

  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   socket.on("pressure", function (data: any) {
  //     setPressure(data);
  //   });
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   socket.on("temperature", function (data: any) {
  //     setTemperature(data);
  //   });
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   socket.on("flow", function (data: any) {
  //     setFlow(data);
  //   });
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   socket.on("weight", function (data: any) {
  //     setWeight(data);
  //   });
  // }, []);

  // const request = () => {
  //   setInterval(() => {
  //     socket.emit(
  //       "send-get",
  //       Math.random(),
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       (err: any, res: any) => {
  //         console.log(res);
  //       }
  //     );
  //   }, 100);
  // };

  // const request2 = () => {
  //   socket.emit("live", "demo");
  // };

  return (
    <div>
      {/* <div className="main">
        <div className="frame">
          <div className="header">
            <Pressure pressureValue={pressure} />
            <Pressure pressureValue={temperature} />
            <Pressure pressureValue={other} />
          </div>
        </div>
      </div> */}
      <p>Pressure: {roundPrecision(pressure, 2)}</p>
      <p>Temperature: {roundPrecision(temperature, 2)}</p>
      <p>Flow: {roundPrecision(flow, 3)}</p>
      <p>Weight: {roundPrecision(weight, 0)}</p>

      <button
        type="button"
        onClick={() => {
          console.log("clicked");
        }}
      >
        Send
      </button>

      <button
        type="button"
        onClick={() => {
          console.log("clicked");
        }}
      >
        Get
      </button>
    </div>
  );
}
