import socket, time
import asyncio
import websockets


async def msg() :    
    while True:
        async with websockets.connect('ws://127.0.0.1:5000/receive') as websocket:
            cod = await websocket.recv()
            print(cod)

asyncio.get_event_loop().run_until_complete(msg())