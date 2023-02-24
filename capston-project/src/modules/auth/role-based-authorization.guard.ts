import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/role.enum';
import { ROLES_KEY } from './decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class RoleBasedAuthorization extends AuthGuard('jwt') {
  // constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    if ( ( user?.role && user.role === Role.Admin ) || ( request?.headers?.email && request.headers.email == user.email ) || ( request?.headers?.role && ( request.headers.role == Role.Admin || request.headers.role == user.role ) ) ) {
      return user;
    }
    else {
      throw new ForbiddenException();
    }
  }
}