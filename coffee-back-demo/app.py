from threading import Timer
import random

import eventlet
import socketio

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)


@sio.event
def connect(sid, environ):
    print('connect ', sid)


@sio.on('send-get')
def msg(sid, data):
    print('message ', data, sid)
    return "OK", "Test data from python"


@sio.event
def disconnect(sid):
    print('disconnect ', sid)


def variation(c_v, start, end, round_precision):
    x = round(random.uniform(start, end), round_precision)

    s_r = random.choice(['+', '-'])

    c_v = c_v + x if s_r == '+' else c_v - x

    return c_v


@sio.on("live")
def live(sid, test):
    temperature = 90.00
    pressure = 9.00
    flow = 1.000
    weight = 0

    for in_x in range(1000000):
        temperature = variation(temperature, 0.00, 0.05, 2)
        pressure = variation(pressure, 0.00, 0.01, 2)
        flow = variation(flow, 0.000, 0.001, 3)
        weight = variation(weight, 0, 1, 1);

        if weight > 60 or weight < 0: 
            weight = 0

        sio.emit('temperature', temperature)
        sio.emit('pressure', pressure)
        sio.emit('flow', flow)
        sio.emit('weight', weight)
        
        sio.sleep(0.1)


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)


# 90.00 variación 0.05 temperatura
# 9.00 variación 0.01 presión
# 1.000 variación 0.001 flujo

# 0, 60 if 60 -> 0 peso