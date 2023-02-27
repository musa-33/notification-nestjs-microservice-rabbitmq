import { Controller, Get, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @EventPattern('comment_created')
  async handleCommentCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log(`${data?.comment?.user?.name} has been comment on article '${data?.comment?.article?.title}'`);
  }
}
