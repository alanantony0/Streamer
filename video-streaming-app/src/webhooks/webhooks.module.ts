import { Module } from '@nestjs/common';
import { WebhookController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.respository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [WebhooksService, UserRepository],
  controllers: [WebhookController],
})
export class WebhooksModule {}
