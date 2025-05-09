import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles.length) {
      return true;
    }
    const req: Request = context.switchToHttp().getRequest();

    if (roles.includes(req['user-role'])) {
      return true;
    } else {
      throw new ForbiddenException({ message: 'Access denied' });
    }
  }
}
