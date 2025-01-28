import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { CalculatorService } from './calculator.service';

@Controller('transaction')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
        return this.calculatorService.createTransaction(createTransactionDto);
    }
}
