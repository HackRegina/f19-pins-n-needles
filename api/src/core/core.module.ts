import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { UserController } from './user/user.controller';
import { AccountService } from './account/account.service';
import { UserService } from './user/user.service';
import { ReportingController } from './reporting/reporting.controller';
import { ReportingService } from './reporting/reporting.service';
import { ReportingEntity } from './reporting/reporting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ReportingEntity,
    ]),
  ],
  controllers: [AccountController, UserController, ReportingController],
  providers: [AccountService, UserService, ReportingService],
})
export class CoreModule {}
