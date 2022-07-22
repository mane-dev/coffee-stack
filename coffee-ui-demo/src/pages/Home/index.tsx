import React, { useEffect, useState } from "react";
import { Pressure } from "../../Components/Pressure/Pressure";
import { io } from "socket.io-client";
import "../../index.css";

const socket = io("http://0.0.0.0:5000");

export default function () {
  const [pValue, setPValue] = useState<number>(3);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on("news", function (data: any) {
      setPValue(data);
    });
  }, []);

  const request = () => {
    socket.emit(
      "send-get",
      "demo",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, res: any) => {
        console.log(res);
      }
    );
  };

  const request2 = () => {
    socket.emit("live", "demo");
  };

  return (
    <div>
      <div className="main">
        <div className="frame">
          <div className="header">
            <Pressure pressureValue={pValue} />
          </div>
        </div>
      </div>
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
