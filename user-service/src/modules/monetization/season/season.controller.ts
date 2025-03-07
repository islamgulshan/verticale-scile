import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SeasonService } from './season.service';
import { SeasonsMonetization } from './season.schema';
import { SeasonDto } from './dtos/dtos';

@Controller('seasons-monetization')
export class SeasonController {
  constructor(private readonly service: SeasonService) {}

  @MessagePattern('create-season-monetization')
  create(@Payload() dto: Partial<SeasonsMonetization>) {
    return this.service.create(dto);
  }

  @MessagePattern('get-season-monetization')
  getList(@Payload() Payload: SeasonDto) {
    return this.service.getList(Payload);
  }

  @MessagePattern('get-season-monetization-by-id')
  getById(@Payload() id: string) {
    return this.service.getById(id);
  }

  @MessagePattern('update-season-monetization')
  update(
    @Payload() { id, dto }: { id: string; dto: Partial<SeasonsMonetization> },
  ) {
    return this.service.update(id, dto);
  }

  @MessagePattern('delete-season-monetization')
  delete(@Payload() id: string) {
    return this.service.delete(id);
  }
}
