import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
