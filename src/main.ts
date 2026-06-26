import { AppModule } from './app.module.js';
import { FsArchAppBuilder } from '@fsarch/server';
import { DATABASE_OPTIONS } from './database/index.js';

async function bootstrap() {
  const app = await new FsArchAppBuilder(AppModule, {
    name: 'Function-Server',
    version: '1.0.0',
  })
    .addSwagger({
      title: 'Function-Server',
      description: 'The Function-Server API description',
      version: '1.0',
    })
    .enableAuth()
    .setDatabase(DATABASE_OPTIONS)
    .build();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
