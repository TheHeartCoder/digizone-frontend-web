import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  oldPassword?: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  newPassword?: string;
}
