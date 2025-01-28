import { Module } from '@nestjs/common';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [CalculatorController],
  providers: [CalculatorService]
})
export class CalculatorModule {}
