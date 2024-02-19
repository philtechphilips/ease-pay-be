import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    username: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Column({ default: 'user' }) 
    @IsString()
    @IsNotEmpty()
    role: string;

    @CreateDateColumn({ name: 'created_at' })
    @IsString()
    @IsNotEmpty()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @IsString()
    @IsNotEmpty()
    updatedAt: Date;
}
