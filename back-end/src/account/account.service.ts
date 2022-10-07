import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(Account)
        private usersRepository: Repository<Account>,
    ) {}

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        return await this.usersRepository.save(createAccountDto);
    }

    async findAll(): Promise<Account[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<Account> {
        return await this.usersRepository.findOneBy({ id: id });
    }

    async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
        const account = await this.findOne(id);
        this.usersRepository.merge(account, updateAccountDto);
        return await this.usersRepository.save(account);
    }

    async remove(id: number): Promise<Account> {
        const account = await this.findOne(id);
        return await this.usersRepository.remove(account);
    }
}
