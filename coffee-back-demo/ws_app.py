#!/usr/bin/env python

import asyncio
import json
import random

import websockets


def variation(c_v, start, end, round_precision):
    x = round(random.uniform(start, end), round_precision)
    s_r = random.choice(['+', '-'])
    c_v = c_v + x if s_r == '+' else c_v - x

    return c_v



async def handler(websocket):
    async for message in websocket:
        event = json.loads(message)
        print(event["type"])
        connected = {websocket}

        if event["type"] == "start_simulation":
            for connection in connected:
                temperature = 90.00
                pressure = 9.00
                flow = 1.000
                weight = 0
                while(True):
                        temperature = variation(temperature, 0.00, 0.05, 2)
                        pressure = variation(pressure, 0.00, 0.01, 2)
                        flow = variation(flow, 0.000, 0.001, 3)
                        weight = variation(weight, 0, 1, 1)

                        if weight > 60 or weight < 0: 
                            weight = 0

                        payload = {
                            "temperature": temperature,
                            "pressure": pressure,
                            "flow": flow,
                            "weight": weight
                        }

                        json_object = json.dumps(payload, indent = 4) 
                        websockets.broadcast(connected, json_object)

                        await asyncio.sleep(.1)
                    

async def main():
    async with websockets.serve(handler, "", 8080):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())


