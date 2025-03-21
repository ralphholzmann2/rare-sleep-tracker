import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ConflictException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

jest.mock("bcrypt");

describe("AuthService", () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe("signUp", () => {
    const email = "test@test.com";
    const password = "TestPassword1!";
    const hashedPassword = "hashedPassword";

    it("should create a new user with hashed password", async () => {
      // Setup mocks
      mockUserService.findByEmail.mockResolvedValueOnce(null);
      (bcrypt.hash as jest.Mock).mockResolvedValueOnce(hashedPassword);
      mockUserService.create.mockResolvedValueOnce({ id: 1 });
      mockUserService.findByEmail.mockResolvedValueOnce({ id: 1, email });

      // Call service method
      const result = await service.signUp(email, password);

      // Verify results
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(mockUserService.create).toHaveBeenCalledWith({
        email,
        password: hashedPassword,
      });
      expect(result).toEqual({ id: 1, email });
    });

    it("should throw ConflictException if user already exists", async () => {
      // Setup mock
      mockUserService.findByEmail.mockResolvedValueOnce({ id: 1, email });

      // Assert throws
      await expect(service.signUp(email, password)).rejects.toThrow(
        ConflictException,
      );
      expect(mockUserService.create).not.toHaveBeenCalled();
    });
  });

  describe("signIn", () => {
    const email = "test@test.com";
    const password = "TestPassword1!";
    const hashedPassword = "hashedPassword";
    const userId = 1;
    const token = "jwt-token";

    it("should return JWT token when credentials are valid", async () => {
      // Setup mocks
      mockUserService.findByEmail.mockResolvedValueOnce({
        id: userId,
        email,
        password: hashedPassword,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
      mockJwtService.signAsync.mockResolvedValueOnce(token);

      // Call service method
      const result = await service.signIn(email, password);

      // Verify results
      expect(mockUserService.findByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({ sub: userId });
      expect(result).toEqual({ jwt: token });
    });

    it("should throw UnauthorizedException if user not found", async () => {
      // Setup mock
      mockUserService.findByEmail.mockResolvedValueOnce(null);

      // Assert throws
      await expect(service.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it("should throw UnauthorizedException if password is invalid", async () => {
      // Setup mocks
      mockUserService.findByEmail.mockResolvedValueOnce({
        id: userId,
        email,
        password: hashedPassword,
      });
      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

      // Assert throws
      await expect(service.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockJwtService.signAsync).not.toHaveBeenCalled();
    });
  });
});
