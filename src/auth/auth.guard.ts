import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')?.[1];

    if (!token) {
      throw new UnauthorizedException({ message: 'Token not provided' });
    }

    try {
      let data = this.jwt.verify(token);
      req['user-id'] = data.id;
      req['restaurant-id'] = data.restaurantId;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Wrong credentials' });
    }

    return true;
  }
}
