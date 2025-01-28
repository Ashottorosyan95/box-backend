import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export enum UserType {
    SUPERADMIN = 'Superadmin',
    ADMIN = 'Admin',
    USER = 'User',
}

@Entity({ name: "User" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.ADMIN,
    })
    type: UserType;
}
