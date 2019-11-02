import { Controller, Post, Body } from '@nestjs/common';
import { ReportingEntity } from './reporting.entity';
import { ReportingService } from './reporting.service';

@Controller('api/v1/reportings')
export class ReportingController {

  constructor(private reportingService: ReportingService) {}

  @Post()
  async create(@Body() reporting: {position, image}): Promise<ReportingEntity> {
    return this.reportingService.create(reporting)
  }
}
