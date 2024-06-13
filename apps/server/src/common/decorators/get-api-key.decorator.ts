import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetApiKey = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['x-api-key'];
  },
);
