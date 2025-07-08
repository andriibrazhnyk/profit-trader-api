import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Email address (must be unique)',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password (must be strong)',
    example: 'Secret_123',
  })
  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;
}
