import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";
import { IsInt } from "class-validator";

export class CreateEntryDto {
	@ApiProperty({
		description: "The date and time the user went to sleep",
		example: "2025-03-22T01:00:00.000Z",
	})
	@IsDateString()
	// @Transform(({ value }) => new Date(value).getTime())
	startTime: number;

	@ApiProperty({
		description: "The date and time the user woke up",
		example: "2025-03-22T09:00:00.000Z",
	})
	@IsDateString()
	// @Transform(({ value }) => new Date(value).getTime())
	endTime: number;
}
