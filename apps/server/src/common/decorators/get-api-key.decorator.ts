import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AUTH_HEADERS } from 'src/authentication/constants/api-key-permissions.contant';

export const GetApiKey = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers[AUTH_HEADERS.API_KEY];
  },
);
