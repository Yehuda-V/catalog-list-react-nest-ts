import { IsString, IsBoolean, IsArray, IsNumber, MinLength } from 'class-validator';

export class CreateCatalogDto {
  @IsString()
  @MinLength(1, { message: 'Name cannot be empty' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsNumber()
  vertical_id: number;

  @IsBoolean()
  is_primary: boolean;

  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { message: 'Local codes cannot be empty' })
  local_codes: string[];

}
