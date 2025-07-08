import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/user-dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiConflictResponse({ description: 'Conflict' })
  @ApiCreatedResponse({ description: 'Success', type: UserDto })
  create(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.create(body);
  }
}
