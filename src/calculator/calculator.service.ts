import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transactions.entity';

@Injectable()
export class CalculatorService {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>,
    ) {}

    async createTransaction(createTransactionDto: CreateTransactionDto): Promise<any> {
        const totalAmount = createTransactionDto.quantity * createTransactionDto.unitPrice;
    
        const transaction = this.transactionRepository.create({
            ...createTransactionDto,
            totalAmount,
        });

        await this.transactionRepository.save(transaction);
        
        return {
            message: 'Transaction created successfully',
            data: transaction,
        };
    }
}
