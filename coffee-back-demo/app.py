from threading import Timer

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


@sio.on("live")
def live(sid, test):
    counter = 3
    print('live')
    for _ in range(100):
        counter += 0.1
        sio.emit('news', counter)
        sio.sleep(0.1)


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)


