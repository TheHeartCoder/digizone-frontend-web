import { userTypes } from 'src/shared/schema/users';
import { IsNotEmpty, IsString, IsIn, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @IsIn([userTypes.admin, userTypes.customer])
  type: string;
}
