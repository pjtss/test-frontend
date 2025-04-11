import argparse
import asyncio
import websockets
import stomper

async def connect():
    ws_url = f"wss://day6.duckdns.org/api/v1/ws"
    async with websockets.connect(ws_url) as websocket:
        await websocket.send("CONNECTnaccept-version:1.0,1.1,2.0\n\n\x00\n")

        sub_offer = stomper.subscribe("/api/v1/sub/test", idx="1234")
        await websocket.send(sub_offer)

        send = stomper.send("/api/v1/pub/test", "1234")
        await websocket.send(send)

        while True:
            print("try")
            message = await websocket.recv()
            print(f"Received message" + message)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="WebRTC webcam")
    parser.add_argument(
        "--host", default="0.0.0.0", help="Host for HTTP server (default: 0.0.0.0)"
    )
    parser.add_argument(
        "--port", type=int, default=8080, help="Port for HTTP server (default:8080)"
    )

    args = parser.parse_args()

    asyncio.get_event_loop().run_until_complete(connect())