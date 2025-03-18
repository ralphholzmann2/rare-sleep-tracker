import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EntryModule } from "./entry/entry.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'rare-sleep-tracker.sqlite',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
		EntryModule,
		AuthModule,
  ],
	controllers: [AppController, AuthController],
	providers: [AppService, AuthService],
})

export class AppModule {}
