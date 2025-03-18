import { Injectable } from "@nestjs/common";
import { CreateEntryDto } from "./dto/create-entry.dto";
import { UpdateEntryDto } from "./dto/update-entry.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Entry } from "./entities/entry.entity";
import { Repository } from "typeorm";

@Injectable()
export class EntryService {
	constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
  ) {}

	create(createEntryDto: CreateEntryDto) {
		return this.entriesRepository.save(createEntryDto);
	}

	findAll() {
		return this.entriesRepository.find();
	}

	findOne(id: number) {
		return this.entriesRepository.findOneBy({ id });
	}

	update(id: number, updateEntryDto: UpdateEntryDto) {
		return this.entriesRepository.update(id, updateEntryDto);
	}

	remove(id: number) {
		return this.entriesRepository.delete(id);
	}
}
