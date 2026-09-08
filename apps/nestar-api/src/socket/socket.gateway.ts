import { Logger } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
  private logger: Logger = new Logger('SocketEventGateway');
  private summeryClient: number = 0;

  public afterInit(server: Server) {
    this.logger.log(`WebSocket server Initialized total ${this.summeryClient}`);
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    this.summeryClient++;
    this.logger.log(`=== Client connected. Total clients: ${this.summeryClient} ===`);
  }

  handleDisconnect(client: WebSocket) {
    this.summeryClient--;
    this.logger.log(`=== Client disconnected. Total clients: ${this.summeryClient} ===`);
  }

  @SubscribeMessage('message')
  public handleMessage(client: WebSocket, payload: any): string {
    return 'Hello, client!';
  }
}