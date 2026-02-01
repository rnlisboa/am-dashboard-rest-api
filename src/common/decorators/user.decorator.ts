import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const User = createParamDecorator(
  <T = any>(
    data: keyof T | undefined,
    context: ExecutionContext,
  ): T | T[keyof T] => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException(
        'User not found. Try to use AuthGuard before this decorator.',
      );
    }

    return data ? request.user[data] : request.user;
  },
);
