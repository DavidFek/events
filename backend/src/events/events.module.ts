import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('events');
  }
}
