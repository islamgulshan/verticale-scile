import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Packages, PackagesSchema } from './packages.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Packages.name,
        schema: PackagesSchema,
      },
    ]),
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
