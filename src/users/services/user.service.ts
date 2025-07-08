import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { IHashService } from 'src/hash/hash.interface';
import { UserDto } from '../dto/user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject('HASH_SERVICE')
    private hashService: IHashService,
  ) {}

  async create(body: CreateUserDto): Promise<UserDto> {
    const password = await this.hashService.hash(body.password);

    await this.ensureUserEmailUnique(body.email);

    const user = this.userRepository.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password,
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  private async ensureUserEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
