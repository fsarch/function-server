import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ControllersModule } from './controllers/controllers.module.js';
import { RepositoriesModule } from './repositories/repositories.module.js';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ControllersModule,
    RepositoriesModule,
  ],
})
export class AppModule {}
