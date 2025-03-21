import { Test, TestingModule } from "@nestjs/testing";
import { EntryService } from "./entry.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Entry } from "./entities/entry.entity";
import { Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { addDays, startOfWeek, format, formatDuration } from "date-fns";

describe("EntryService", () => {
  let service: EntryService;
  let entryRepository: Repository<Entry>;

  const mockEntryRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryService,
        {
          provide: getRepositoryToken(Entry),
          useValue: mockEntryRepository,
        },
      ],
    }).compile();

    service = module.get<EntryService>(EntryService);
    entryRepository = module.get<Repository<Entry>>(getRepositoryToken(Entry));
  });

  describe("validateEntry", () => {
    const userId = 1;
    const startTime = new Date("2023-03-15T22:00:00").getTime();
    const endTime = new Date("2023-03-16T06:00:00").getTime();

    it("should throw BadRequestException if overlapping entry exists", async () => {
      // Setup
      mockEntryRepository.find.mockResolvedValueOnce([
        {
          id: 1,
          startTime: new Date("2023-03-15T21:00:00").getTime(),
          endTime: new Date("2023-03-16T05:00:00").getTime(),
        },
      ]);

      // Call service method and expect exception
      await expect(
        service.validateEntry(userId, startTime, endTime),
      ).rejects.toThrow(BadRequestException);

      // Verify repository was called with correct params
      expect(mockEntryRepository.find).toHaveBeenCalledWith({
        where: {
          user: { id: userId },
          startTime: expect.any(Object),
          endTime: expect.any(Object),
        },
      });
    });

    it("should not throw an exception if no overlapping entries exist", async () => {
      // Setup
      mockEntryRepository.find.mockResolvedValueOnce([]);

      // Call service method
      await expect(
        service.validateEntry(userId, startTime, endTime),
      ).resolves.not.toThrow();

      // Verify repository was called
      expect(mockEntryRepository.find).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    const userId = 1;
    const createEntryDto = {
      startTime: new Date("2023-03-15T22:00:00").getTime(),
      endTime: new Date("2023-03-16T06:00:00").getTime(),
    };
    const savedEntry = {
      id: 1,
      ...createEntryDto,
      user: { id: userId },
    };

    it("should create and return a new entry", async () => {
      // Setup mocks
      mockEntryRepository.find.mockResolvedValueOnce([]);
      mockEntryRepository.save.mockResolvedValueOnce(savedEntry);

      // Call service method
      const result = await service.create(createEntryDto, userId);

      // Verify results
      expect(mockEntryRepository.find).toHaveBeenCalled();
      expect(mockEntryRepository.save).toHaveBeenCalledWith({
        ...createEntryDto,
        user: { id: userId },
      });
      expect(result).toEqual(savedEntry);
    });

    it("should throw BadRequestException if entry overlaps with existing", async () => {
      // Setup
      mockEntryRepository.find.mockResolvedValueOnce([
        {
          id: 2,
          startTime: new Date("2023-03-15T21:00:00").getTime(),
          endTime: new Date("2023-03-16T05:00:00").getTime(),
        },
      ]);

      // Call service method and expect exception
      await expect(service.create(createEntryDto, userId)).rejects.toThrow(
        BadRequestException,
      );

      // Verify save was not called
      expect(mockEntryRepository.save).not.toHaveBeenCalled();
    });
  });

  describe("findAll", () => {
    const userId = 1;
    const entries = [
      {
        id: 1,
        startTime: new Date("2023-03-15T22:00:00").getTime(),
        endTime: new Date("2023-03-16T06:00:00").getTime(),
        user: { id: userId },
      },
      {
        id: 2,
        startTime: new Date("2023-03-16T22:00:00").getTime(),
        endTime: new Date("2023-03-17T06:00:00").getTime(),
        user: { id: userId },
      },
    ];

    it("should return all entries for a user ordered by startTime DESC", async () => {
      // Setup
      mockEntryRepository.find.mockResolvedValueOnce(entries);

      // Call service method
      const result = await service.findAll(userId);

      // Verify results
      expect(mockEntryRepository.find).toHaveBeenCalledWith({
        where: {
          user: { id: userId },
        },
        order: {
          startTime: "DESC",
        },
      });
      expect(result).toEqual(entries);
    });
  });

  describe("findOne", () => {
    const id = 1;
    const entry = {
      id,
      startTime: new Date("2023-03-15T22:00:00").getTime(),
      endTime: new Date("2023-03-16T06:00:00").getTime(),
    };

    it("should return a single entry by id", async () => {
      // Setup
      mockEntryRepository.findOneBy.mockResolvedValueOnce(entry);

      // Call service method
      const result = await service.findOne(id);

      // Verify results
      expect(mockEntryRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(entry);
    });
  });

  describe("update", () => {
    const id = 1;
    const userId = 1;
    const updateEntryDto = {
      startTime: new Date("2023-03-15T23:00:00").getTime(),
      endTime: new Date("2023-03-16T07:00:00").getTime(),
    };
    const updatedEntry = {
      id,
      ...updateEntryDto,
      user: { id: userId },
    };

    it("should update and return the entry", async () => {
      // Setup mocks
      mockEntryRepository.find.mockResolvedValueOnce([]);
      mockEntryRepository.update.mockResolvedValueOnce({ affected: 1 });
      mockEntryRepository.findOneBy.mockResolvedValueOnce(updatedEntry);

      // Call service method
      const result = await service.update(id, updateEntryDto, userId);

      // Verify results
      expect(mockEntryRepository.find).toHaveBeenCalled();
      expect(mockEntryRepository.update).toHaveBeenCalledWith(
        { id },
        updateEntryDto,
      );
      expect(mockEntryRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(updatedEntry);
    });

    it("should throw BadRequestException if update would create overlap", async () => {
      // Setup
      mockEntryRepository.find.mockResolvedValueOnce([
        {
          id: 2,
          startTime: new Date("2023-03-15T22:30:00").getTime(),
          endTime: new Date("2023-03-16T06:30:00").getTime(),
        },
      ]);

      // Call service method and expect exception
      await expect(service.update(id, updateEntryDto, userId)).rejects.toThrow(
        BadRequestException,
      );

      // Verify update was not called
      expect(mockEntryRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("remove", () => {
    const id = 1;
    const userId = 1;

    it("should delete an entry", async () => {
      // Setup
      mockEntryRepository.delete.mockResolvedValueOnce({ affected: 1 });

      // Call service method
      await service.remove(id, userId);

      // Verify repository was called with correct params
      expect(mockEntryRepository.delete).toHaveBeenCalledWith({
        id,
        user: { id: userId },
      });
    });
  });

  describe("getSummary", () => {
    const userId = 1;
    const weekOf = startOfWeek(new Date("2023-03-15"), { weekStartsOn: 1 });

    const mockEntries = [
      {
        id: 1,
        startTime: new Date("2023-03-15T22:00:00").getTime(),
        endTime: new Date("2023-03-16T06:00:00").getTime(),
        user: { id: userId },
      },
      {
        id: 2,
        startTime: new Date("2023-03-16T23:00:00").getTime(),
        endTime: new Date("2023-03-17T07:00:00").getTime(),
        user: { id: userId },
      },
    ];

    beforeEach(() => {
      // Mock console.log to avoid cluttering test output
      jest.spyOn(console, "log").mockImplementation(() => {});
    });

    it("should return summary data with average sleep metrics", async () => {
      // Setup
      mockEntryRepository.find.mockResolvedValueOnce(mockEntries);

      // Call service method
      const result = await service.getSummary(userId, weekOf);

      // Verify repository was called with correct params
      expect(mockEntryRepository.find).toHaveBeenCalledWith({
        where: {
          user: { id: userId },
          endTime: expect.any(Object),
          startTime: expect.any(Object),
        },
      });

      // Verify the result has the expected structure
      expect(result).toHaveProperty("average.duration");
      expect(result).toHaveProperty("average.bedtime");
      expect(result).toHaveProperty("average.wakeup");
      expect(result).toHaveProperty("data");
      expect(result.data).toEqual(mockEntries);
    });
  });
});
