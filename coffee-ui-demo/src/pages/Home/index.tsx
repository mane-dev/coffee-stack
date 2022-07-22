import React, { useEffect, useState } from "react";
// import { Pressure } from "../../Components/Pressure/Pressure";
import { io } from "socket.io-client";
import { roundPrecision } from "../../Utils";
import "../../index.css";

const socket = io("http://0.0.0.0:5000");

export default function () {
  const [temperature, setTemperature] = useState<number>(90.0);
  const [pressure, setPressure] = useState<number>(9.0);
  const [flow, setFlow] = useState<number>(1.0);
  const [weight, setWeight] = useState<number>(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("pressure", function (data: any) {
      setPressure(data);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("temperature", function (data: any) {
      setTemperature(data);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("flow", function (data: any) {
      setFlow(data);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("weight", function (data: any) {
      setWeight(data);
    });
  }, []);

  const request = () => {
    setInterval(() => {
      socket.emit(
        "send-get",
        Math.random(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err: any, res: any) => {
          console.log(res);
        }
      );
    }, 100);
  };

  const request2 = () => {
    socket.emit("live", "demo");
  };

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
          request();
        }}
      >
        Send
      </button>

      <button
        type="button"
        onClick={() => {
          request2();
        }}
      >
        Get
      </button>
    </div>
  );
}
