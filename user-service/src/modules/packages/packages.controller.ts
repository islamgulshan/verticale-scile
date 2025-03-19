import { Controller } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Packages } from './packages.schema';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}
  @MessagePattern('create-package')
  create(@Payload() dto: Partial<Packages>): Promise<Packages> {
    return this.packagesService.create(dto);
  }

  @MessagePattern('get-packages')
  get(@Payload() dto: Partial<Packages>): Promise<Packages[]> {
    return this.packagesService.get();
  }

  @MessagePattern('get-package')
  getById(@Payload() id: string): Promise<Packages> {
    return this.packagesService.getById(id);
  }
}
