import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { IHashService } from './hash.interface';

@Injectable()
export class Argon2HashService implements IHashService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
