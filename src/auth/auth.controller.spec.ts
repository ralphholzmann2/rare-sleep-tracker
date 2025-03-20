import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
	let controller: AuthController;
	let authService: AuthService;

	const mockAuthService = {
		signUp: jest.fn(),
		signIn: jest.fn(),
	};

	beforeEach(async () => {
		jest.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useValue: mockAuthService }],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	describe("register", () => {
		it("should call authService.signUp with correct params and return the result", async () => {
			// Setup
			const dto = { email: "test@test.com", password: "TestPassword1!" };
			const expectedResult = { id: 1, email: dto.email };
			mockAuthService.signUp.mockResolvedValueOnce(expectedResult);

			// Call controller method
			const result = await controller.create(dto);

			// Verify results
			expect(mockAuthService.signUp).toHaveBeenCalledWith(
				dto.email,
				dto.password,
			);
			expect(result).toEqual(expectedResult);
		});
	});

	describe("login", () => {
		it("should call authService.signIn with correct params and return the result", async () => {
			// Setup
			const dto = { email: "test@test.com", password: "TestPassword1!" };
			const expectedResult = { jwt: "token" };
			mockAuthService.signIn.mockResolvedValueOnce(expectedResult);

			// Call controller method
			const result = await controller.login(dto);

			// Verify results
			expect(mockAuthService.signIn).toHaveBeenCalledWith(
				dto.email,
				dto.password,
			);
			expect(result).toEqual(expectedResult);
		});
	});
});
