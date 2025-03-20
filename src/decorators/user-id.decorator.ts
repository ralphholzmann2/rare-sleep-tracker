import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator(
	(data, ctx: ExecutionContext): number => {
		const req = ctx.switchToHttp().getRequest();
		return req.user.sub;
	},
);
