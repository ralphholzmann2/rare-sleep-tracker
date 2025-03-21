import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

describe("UserService", () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe("create", () => {
    it("should save and return the new user", async () => {
      // Setup
      const userData = {
        email: "test@test.com",
        password: "hashedPassword",
      };
      const savedUser = {
        id: 1,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockUserRepository.save.mockResolvedValueOnce(savedUser);

      // Call service method
      const result = await service.create(userData);

      // Verify results
      expect(mockUserRepository.save).toHaveBeenCalledWith(userData);
      expect(result).toEqual(savedUser);
    });
  });

  describe("findByEmail", () => {
    it("should find and return user by email", async () => {
      // Setup
      const email = "test@test.com";
      const user = {
        id: 1,
        email,
        password: "hashedPassword",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockUserRepository.findOne.mockResolvedValueOnce(user);

      // Call service method
      const result = await service.findByEmail(email);

      // Verify results
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toEqual(user);
    });

    it("should return null if user not found", async () => {
      // Setup
      const email = "nonexistent@test.com";
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      // Call service method
      const result = await service.findByEmail(email);

      // Verify results
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toBeNull();
    });
  });
});
