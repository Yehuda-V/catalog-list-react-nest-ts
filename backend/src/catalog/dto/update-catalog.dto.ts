import { IsBoolean, IsArray, IsString, MinLength } from 'class-validator';

export class UpdateCatalogDto {
  @IsBoolean()
  is_primary: boolean;
  
  @IsBoolean()
  start_indexing: boolean;
  
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { message: 'Local codes cannot be empty' })
  local_codes: string[];
}
