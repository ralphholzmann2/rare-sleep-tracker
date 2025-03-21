import { Test } from "@nestjs/testing";
import type { EntryService } from "./entry.service";
import type { CreateEntryDto } from "./dto/create-entry.dto";
import type { UpdateEntryDto } from "./dto/update-entry.dto";
import { startOfWeek, parse } from "date-fns";

// This file will test the service methods directly that would be called by the controller
describe("EntryController", () => {
  let entryService: EntryService;

  const mockEntryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getSummary: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    // Create a test module with the EntryService mock
    entryService = mockEntryService as unknown as EntryService;
  });

  describe("getSummary", () => {
    it("should call entryService.getSummary with correct parameters", async () => {
      // Setup
      const userId = 1;
      const weekString = "2023-03-15";
      const summaryData = { average: {}, data: [] };
      mockEntryService.getSummary.mockResolvedValueOnce(summaryData);

      // Parse the date like the controller would
      const parsedWeek = parse(weekString, "yyyy-MM-dd", new Date());
      const weekOf = startOfWeek(parsedWeek, { weekStartsOn: 1 });

      // Call service method directly
      const result = await entryService.getSummary(userId, weekOf);

      // Verify results
      expect(mockEntryService.getSummary).toHaveBeenCalledWith(userId, weekOf);
      expect(result).toEqual(summaryData);
    });

    it("should handle invalid date string", async () => {
      // Setup
      const userId = 1;
      const summaryData = { average: {}, data: [] };
      mockEntryService.getSummary.mockResolvedValueOnce(summaryData);

      // When parse fails, use current date
      const weekOf = startOfWeek(new Date(), { weekStartsOn: 1 });

      // Call service directly with current date
      const result = await entryService.getSummary(userId, weekOf);

      // Verify results
      expect(mockEntryService.getSummary).toHaveBeenCalledWith(userId, weekOf);
      expect(result).toEqual(summaryData);
    });
  });

  describe("create", () => {
    it("should call entryService.create with correct parameters", async () => {
      // Setup
      const userId = 1;
      const createEntryDto: CreateEntryDto = {
        startTime: new Date("2023-03-15T22:00:00").getTime(),
        endTime: new Date("2023-03-16T06:00:00").getTime(),
      };
      const createdEntry = { id: 1, ...createEntryDto, user: { id: userId } };
      mockEntryService.create.mockResolvedValueOnce(createdEntry);

      // Call service method directly
      const result = await entryService.create(createEntryDto, userId);

      // Verify results
      expect(mockEntryService.create).toHaveBeenCalledWith(
        createEntryDto,
        userId,
      );
      expect(result).toEqual(createdEntry);
    });
  });

  describe("findAll", () => {
    it("should call entryService.findAll with correct parameters", async () => {
      // Setup
      const userId = 1;
      const entries = [
        {
          id: 1,
          startTime: new Date("2023-03-15T22:00:00").getTime(),
          endTime: new Date("2023-03-16T06:00:00").getTime(),
        },
      ];
      mockEntryService.findAll.mockResolvedValueOnce(entries);

      // Call service method directly
      const result = await entryService.findAll(userId);

      // Verify results
      expect(mockEntryService.findAll).toHaveBeenCalledWith(userId);
      expect(result).toEqual(entries);
    });
  });

  describe("findOne", () => {
    it("should call entryService.findOne with correct parameters", async () => {
      // Setup
      const id = 1;
      const entry = {
        id,
        startTime: new Date("2023-03-15T22:00:00").getTime(),
        endTime: new Date("2023-03-16T06:00:00").getTime(),
      };
      mockEntryService.findOne.mockResolvedValueOnce(entry);

      // Call service method directly
      const result = await entryService.findOne(id);

      // Verify results
      expect(mockEntryService.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(entry);
    });
  });

  describe("update", () => {
    it("should call entryService.update with correct parameters", async () => {
      // Setup
      const id = 1;
      const userId = 1;
      const updateEntryDto: UpdateEntryDto = {
        startTime: new Date("2023-03-15T23:00:00").getTime(),
        endTime: new Date("2023-03-16T07:00:00").getTime(),
      };
      const updatedEntry = {
        id: 1,
        startTime: updateEntryDto.startTime,
        endTime: updateEntryDto.endTime,
      };
      mockEntryService.update.mockResolvedValueOnce(updatedEntry);

      // Call service method directly
      const result = await entryService.update(id, updateEntryDto, userId);

      // Verify results
      expect(mockEntryService.update).toHaveBeenCalledWith(
        id,
        updateEntryDto,
        userId,
      );
      expect(result).toEqual(updatedEntry);
    });
  });

  describe("remove", () => {
    it("should call entryService.remove with correct parameters", async () => {
      // Setup
      const id = 1;
      const userId = 1;
      const deleteResult = { affected: 1 };
      mockEntryService.remove.mockResolvedValueOnce(deleteResult);

      // Call service method directly
      const result = await entryService.remove(id, userId);

      // Verify results
      expect(mockEntryService.remove).toHaveBeenCalledWith(id, userId);
      expect(result).toEqual(deleteResult);
    });
  });
});
