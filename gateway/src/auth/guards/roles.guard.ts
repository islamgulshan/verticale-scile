// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
    private readonly logger = new Logger(RolesGuard.name);
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        this.logger.log('RolesGuard invoked');
        const requiredRoles = this.reflector.get<string[]>('role', context.getHandler());
        if (!requiredRoles) {
            this.logger.log('No specific roles required for this route.');
            return true;  // If no roles are specified, allow access
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.role) {
            this.logger.warn('User or user roles are not properly defined.');
            throw new ForbiddenException('Insufficient roles');
        }
        if (user.role.name === requiredRoles[0]) {
            return true;
        } else {
            throw new ForbiddenException('Insufficient roles');
        }
    }
}
