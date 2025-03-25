import threading
import websocket
import time
import json

class WebSocketClient:
    def __init__(self, ws_url):
        self.ws_url = ws_url
        self.ws = None
        self.is_connected = False
        
        # 웹소켓 설정
        websocket.enableTrace(True)
        
        # 웹소켓 연결
        self.ws = websocket.WebSocketApp(
            ws_url,
            on_open=self.on_open,
            on_message=self.on_message,
            on_error=self.on_error,
            on_close=self.on_close
        )

    def on_message(self, ws, message):
        """메시지 수신시 호출"""
        try:
            # JSON 메시지 파싱
            message_data = json.loads(message)
            print(f"받은 메시지: {message_data}")
        except json.JSONDecodeError:
            print(f"받은 일반 메시지: {message}")

    def on_error(self, ws, error):
        """에러 발생시 호출"""
        print(f"에러 발생: {error}")

    def on_close(self, ws, close_status_code, close_msg):
        """연결 종료시 호출"""
        print(f"웹소켓 연결이 종료되었습니다. (상태 코드: {close_status_code}, 메시지: {close_msg})")
        self.is_connected = False

    def on_open(self, ws):
        """연결이 열리면 호출"""
        print("웹소켓 연결이 열렸습니다.")
        self.is_connected = True
        
        # 연결 초기화 메시지 전송
        self.initialize_connection()
        
        # 구독 메시지 전송
        self.subscribe()
        
        # 메시지 송신 쓰레드 시작
        self.send_thread = threading.Thread(target=self.send_messages)
        self.send_thread.daemon = True
        self.send_thread.start()

    def initialize_connection(self):
        """연결 초기화 메시지 전송"""
        try:
            init_message = {
                "type": "connection_init",
                "payload": {}
            }
            self.ws.send(json.dumps(init_message))
            print(f"초기화 메시지 전송: {init_message}")
        except Exception as e:
            print(f"초기화 메시지 전송 중 에러 발생: {e}")

    def subscribe(self):
        """구독 메시지 전송"""
        try:
            subscribe_message = {
                "type": "subscribe",
                "topic": "/api/v1/sub"
            }
            self.ws.send(json.dumps(subscribe_message))
            print(f"구독 요청 전송: {subscribe_message}")
        except Exception as e:
            print(f"구독 요청 중 에러 발생: {e}")

    def send_messages(self):
        """메시지 전송을 담당하는 메서드"""
        while self.is_connected:
            try:
                # 메시지 데이터 준비
                message_data = {
                    "type": "publish",
                    "topic": "/api/v1/pub/test",
                    "message": "안녕하세요!"
                }
                
                # JSON 형식으로 변환하여 전송
                self.ws.send(json.dumps(message_data))
                print(f"메시지 전송: {message_data}")
                time.sleep(2)  # 2초 간격으로 메시지 전송
            except Exception as e:
                print(f"메시지 전송 중 에러 발생: {e}")
                time.sleep(2)  # 에러 발생시에도 잠시 대기 후 재시도
                continue

    def start(self):
        """웹소켓 연결 시작"""
        self.ws_thread = threading.Thread(target=self.ws.run_forever)
        self.ws_thread.daemon = True
        self.ws_thread.start()

    def stop(self):
        """웹소켓 연결 종료"""
        self.is_connected = False
        if self.ws:
            self.ws.close()

def main():
    ws_url = "wss://day6.duckdns.org/api/v1/ws"
    
    # 웹소켓 클라이언트 생성 및 시작
    client = WebSocketClient(ws_url)
    client.start()
    
    try:
        # 메인 쓰레드 유지
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("프로그램을 종료합니다...")
        client.stop()

if __name__ == "__main__":
    main()
