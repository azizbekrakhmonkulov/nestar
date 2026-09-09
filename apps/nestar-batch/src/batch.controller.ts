import { Controller, Get, Logger } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_ROLLBACK, BATCH_TOP_AGENT, BATCH_TOP_PROPERTIES } from './lib/config';

@Controller()
export class BatchController {
  private logger: Logger = new Logger('BatchController');

  constructor(private readonly BatchService: BatchService) { }

  @Timeout(1000)
  handleTimeout() {
    this.logger.debug('BATCH SERVER IS READY!\n\n');
  }

  @Cron('00 00 01 * * *', { name: 'TEST_CRON' })
  public async batchRollBack() {
    try {
      this.logger['context'] = BATCH_ROLLBACK;
      this.logger.debug('EXECUTED!');
      await this.BatchService.batchRollBack();

    } catch (error) {
      this.logger.error(error);
    }
  }

  @Cron('20 00 01 * * *', { name: BATCH_TOP_PROPERTIES })
  public async batchTopProperties() {
    try {
      this.logger['context'] = BATCH_TOP_PROPERTIES;
      this.logger.debug('EXECUTED!');
      await this.BatchService.batchTopProperties();

    } catch (error) {
      this.logger.error(error);
    }
  }
  @Cron('40 00 01 * * *', { name: BATCH_TOP_AGENT })
  public async batchTopAgents() {
    try {
      this.logger['context'] = BATCH_TOP_AGENT;
      this.logger.debug('EXECUTED!');
      await this.BatchService.batchTopAgents();

    } catch (error) {
      this.logger.error(error);
    }
  }


  /**
  @Interval(1000)
  handleInterval() {
    this.logger.debug('INTERVAL RUNNING');
  }
 */


  @Get()
  getHello(): string {
    return this.BatchService.getHello();
  }
}
