import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateEntryDto } from "./dto/create-entry.dto";
import { UpdateEntryDto } from "./dto/update-entry.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Entry } from "./entities/entry.entity";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import {
  addMilliseconds,
  format,
  formatDuration,
  getHours,
  getMinutes,
  getSeconds,
  intervalToDuration,
  setHours,
  setMinutes,
  setSeconds,
  startOfWeek,
  addDays,
} from "date-fns";

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
  ) {}

  async validateEntry(userId: number, startTime: number, endTime: number) {
    const entries = await this.entriesRepository.find({
      where: {
        user: { id: userId },
        startTime: LessThanOrEqual(endTime),
        endTime: MoreThanOrEqual(startTime),
      },
    });

    if (entries.length > 0) {
      throw new BadRequestException("You were already asleep at this time!");
    }
  }

  async create(createEntryDto: CreateEntryDto, userId: number) {
    const { startTime, endTime } = createEntryDto;

    await this.validateEntry(userId, startTime, endTime);

    return this.entriesRepository.save({
      ...createEntryDto,
      user: { id: userId },
    });
  }

  findAll(userId: number) {
    return this.entriesRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        startTime: "DESC",
      },
    });
  }

  findOne(id: number) {
    return this.entriesRepository.findOneBy({ id });
  }

  async update(id: number, updateEntryDto: UpdateEntryDto, userId: number) {
    const { startTime, endTime } = updateEntryDto;

    await this.validateEntry(userId, startTime, endTime);
    await this.entriesRepository.update(
      {
        id,
      },
      updateEntryDto,
    );
    return this.findOne(id);
  }

  remove(id: number, userId: number) {
    return this.entriesRepository.delete({
      id,
      user: { id: userId },
    });
  }

  async getSummary(userId: number, weekOf: Date) {
    console.log(
      "looking between",
      weekOf.getTime(),
      addDays(weekOf, 7).getTime(),
    );
    const entries = await this.entriesRepository.find({
      where: {
        user: { id: userId },
        // Don't feel great about this typecasting here. Something odd with the way
        // sqlite compares dates. I could debug for awhile but I wanted to finish this up.
        endTime: MoreThanOrEqual(weekOf as unknown as number),
        startTime: LessThanOrEqual(addDays(weekOf, 7) as unknown as number),
      },
    });
    const beginningOfWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

    const averageDuration =
      entries.reduce(
        (acc, entry) =>
          acc +
          (new Date(entry.endTime).getTime() -
            new Date(entry.startTime).getTime()),
        0,
      ) / entries.length;

    const averageBedTime =
      entries.reduce((acc, entry) => {
        let bedtime = setHours(beginningOfWeek, getHours(entry.startTime));
        bedtime = setMinutes(bedtime, getMinutes(entry.startTime));
        bedtime = setSeconds(bedtime, getSeconds(entry.startTime));

        return acc + bedtime.getTime();
      }, 0) / entries.length;

    const averageWakeupTime =
      entries.reduce((acc, entry) => {
        let wakeup = setHours(beginningOfWeek, getHours(entry.endTime));
        wakeup = setMinutes(wakeup, getMinutes(entry.endTime));
        wakeup = setSeconds(wakeup, getSeconds(entry.endTime));
        return acc + wakeup.getTime();
      }, 0) / entries.length;

    return {
      average: {
        duration: {
          minutes: Math.round(averageDuration / 60000),
          humanized: formatDuration(
            intervalToDuration({
              start: new Date(),
              end: addMilliseconds(new Date(), averageDuration),
            }),
            {
              format: ["hours", "minutes"],
            },
          ),
        },
        bedtime: {
          exact: format(new Date(averageBedTime), "HH:mm:ss"),
          humanized: format(new Date(averageBedTime), "h:mmaaa"),
        },
        wakeup: {
          exact: format(new Date(averageWakeupTime), "HH:mm:ss"),
          humanized: format(new Date(averageWakeupTime), "h:mmaaa"),
        },
      },
      data: entries,
    };
  }
}
