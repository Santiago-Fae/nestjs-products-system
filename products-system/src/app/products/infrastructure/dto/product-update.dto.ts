import { IsDecimal, IsInt, IsOptional, IsString } from 'class-validator';

export class ProductUpdateDTO {
    @IsInt()
    id: number;

    @IsString()
    name: string;
    
    @IsDecimal()
    price: number;

    @IsOptional()
    is_active: boolean;
}
