import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationController } from './observation.controller';

@Module({
  controllers: [ObservationController],
  providers: [ObservationService]
})
export class ObservationModule {}
