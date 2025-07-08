import { Module } from '@nestjs/common';
import { Argon2HashService } from './argon2-hash.service';

@Module({
  providers: [
    {
      provide: 'HASH_SERVICE',
      useClass: Argon2HashService,
    },
  ],
  exports: ['HASH_SERVICE'],
})
export class HashModule {}
