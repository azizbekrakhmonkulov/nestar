import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchService {

  public async batchRollBack(): Promise<void> {
    console.log('BATCH ROLLBACK\n\n');
  }

  public async batchProperties(): Promise<void> {
    console.log('BATCH PROPERTIES\n\n');
  }

  public async batchAgents(): Promise<void> {
    console.log('BATCH AGENTS\n\n');
  }

  public getHello(): string {
    return 'Welcome to Nestar Batch API Server!';
  }
}
