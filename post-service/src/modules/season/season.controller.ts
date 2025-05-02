import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Season } from 'src/models/season';
import { SeasonService } from './season.service';

@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}
  @MessagePattern('create-season')
  create(@Payload() dto: Partial<Season>) {
    return this.seasonService.create(dto);
  }

  @MessagePattern('get-seasons')
  getAll(@Payload() dto: { name: string; page?: number; limit: number }) {
    return this.seasonService.getAll(dto);
  }

  @MessagePattern('get-season')
  getById(@Payload() id: string) {
    console.log(id);
    return this.seasonService.getById(id);
  }

  @MessagePattern('update-season')
  update(@Payload() dto: { id: string; name: string }) {
    return this.seasonService.update(dto.id, dto);
  }

  @MessagePattern('delete-season')
  delete(@Payload() id: string) {
    return this.seasonService.delete(id);
  }
}
