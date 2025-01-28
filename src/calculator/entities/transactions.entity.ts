import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Transaction" })
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    quantity: number;

    @Column()
    unitPrice: number;

    @Column()
    totalAmount: number;

    @Column('date')
    date: string;
}
