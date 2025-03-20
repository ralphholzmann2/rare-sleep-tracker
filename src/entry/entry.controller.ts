import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
} from "@nestjs/common";
import { EntryService } from "./entry.service";
import { CreateEntryDto } from "./dto/create-entry.dto";
import { UpdateEntryDto } from "./dto/update-entry.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserId } from "src/decorators/user-id.decorator";
import { parse, startOfWeek } from "date-fns";

@Controller("entries")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class EntryController {
	constructor(private entryService: EntryService) {}

	@Get("summary")
	getSummary(@Query("week") week: string, @UserId() userId: number) {
		let parsedWeek: Date;
		try {
			parsedWeek = parse(week, "yyyy-MM-dd", new Date());
		} catch (error) {
			parsedWeek = new Date();
		}
		const weekOf = startOfWeek(parsedWeek, { weekStartsOn: 1 });
		return this.entryService.getSummary(userId, weekOf);
	}

	@Post()
	create(@Body() createEntryDto: CreateEntryDto, @UserId() userId: number) {
		return this.entryService.create(createEntryDto, userId);
	}

	@Get()
	findAll(@UserId() userId: number) {
		return this.entryService.findAll(userId);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.entryService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateEntryDto: UpdateEntryDto,
		@UserId() userId: number,
	) {
		return this.entryService.update(+id, updateEntryDto, userId);
	}

	@Delete(":id")
	remove(@Param("id") id: string, @UserId() userId: number) {
		return this.entryService.remove(+id, userId);
	}
}
