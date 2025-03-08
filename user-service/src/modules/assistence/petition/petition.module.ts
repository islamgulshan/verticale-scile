import { Module } from '@nestjs/common';
import { PetitionService } from './petition.service';
import { PetitionController } from './petition.controller';
import {
  AssistencePetition,
  AssistencePetitionSchema,
} from './petition.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AssistencePetition.name,
        schema: AssistencePetitionSchema,
      },
    ]),
  ],
  providers: [PetitionService],
  controllers: [PetitionController],
})
export class PetitionModule {}
