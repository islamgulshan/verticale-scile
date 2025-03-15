import { Controller } from '@nestjs/common';
import { AssistencePetition } from './petition.schema';
import { PetitionService } from './petition.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PetitionAssistanceDto } from './dtos/dtos';
import { PaginatedResponseDto } from 'src/constants/common';

@Controller('petition')
export class PetitionController {
  constructor(private readonly assistancePetitionService: PetitionService) {}
  @MessagePattern('create-assistance-petition')
  async create(
    @Payload() dto: Partial<AssistencePetition>,
  ): Promise<AssistencePetition> {
    return this.assistancePetitionService.create(dto);
  }
  @MessagePattern('get-assistance-petition')
  async getList(
    @Payload() payload?: PetitionAssistanceDto,
  ): Promise<PaginatedResponseDto> {
    return this.assistancePetitionService.getList(payload);
  }

  @MessagePattern('get-assistance-petition-by-id')
  async getById(
    @Payload() id: Partial<AssistencePetition>,
  ): Promise<AssistencePetition> {
    return this.assistancePetitionService.getById(id);
  }

  @MessagePattern('get-assistance-petition-suppoters')
  async getSuppoters(
    @Payload() id: Partial<AssistencePetition>,
  ): Promise<AssistencePetition> {
    return this.assistancePetitionService.getSupporters(id);
  }

  @MessagePattern('support-assistance-petition')
  async support(
    @Payload() payload: Partial<AssistencePetition>,
  ): Promise<AssistencePetition> {
    return this.assistancePetitionService.support(payload);
  }
  @MessagePattern('delete-assistance-petition')
  async delete(
    @Payload() id: Partial<AssistencePetition>,
  ): Promise<AssistencePetition> {
    return this.assistancePetitionService.delete(id);
  }
}
