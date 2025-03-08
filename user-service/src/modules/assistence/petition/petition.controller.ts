import { Controller } from '@nestjs/common';
import { AssistencePetition } from './petition.schema';
import { PetitionService } from './petition.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PetitionAssistanceDto } from './dtos/dtos';

@Controller('petition')
export class PetitionController {
  constructor(private readonly assistancePetitionService: PetitionService) {}
  @MessagePattern('create-assistance-petition')
  create(@Payload() dto: Partial<AssistencePetition>) {
    return this.assistancePetitionService.create(dto);
  }
  @MessagePattern('get-assistance-petition')
  getList(@Payload() payload?: PetitionAssistanceDto) {
    return this.assistancePetitionService.getList(payload);
  }

  @MessagePattern('get-assistance-petition-by-id')
  getById(@Payload() id: Partial<AssistencePetition>) {
    return this.assistancePetitionService.getById(id);
  }

  @MessagePattern('get-assistance-petition-suppoters')
  getSuppoters(@Payload() id: Partial<AssistencePetition>) {
    return this.assistancePetitionService.getSupporters(id);
  }

  @MessagePattern('support-assistance-petition')
  support(@Payload() payload: Partial<AssistencePetition>) {
    return this.assistancePetitionService.support(payload);
  }
  @MessagePattern('delete-assistance-petition')
  delete(@Payload() id: Partial<AssistencePetition>) {
    return this.assistancePetitionService.delete(id);
  }
}
