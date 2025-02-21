import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
    private readonly logger = new Logger(PermissionsGuard.name);
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        this.logger.log('PermissionsGuard invoked');
        const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!requiredPermissions) {
            this.logger.log('No specific permissions required for this route.');
            return true;  // If no permissions are specified, allow access
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.role) {
            this.logger.warn('User or user roles are not properly defined.');
            throw new ForbiddenException('Insufficient permissions');
        }
        const hasPermission = requiredPermissions.every(permission => user.role.permissions.includes(permission));
        if (!hasPermission) {
            this.logger.warn('User does not have the required permissions.');
            throw new ForbiddenException('Insufficient permissions');
        }
        return true;
    }
}
