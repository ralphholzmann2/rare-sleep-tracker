import { Module } from "@nestjs/common";
import { EntryService } from "./entry.service";
import { EntryController } from "./entry.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Entry } from "./entities/entry.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Entry]), JwtModule],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}
