import { IsDecimal, IsOptional, IsString } from 'class-validator';

export class ProductCreateDTO {
    @IsString()
    name: string;
    
    @IsDecimal()
    price: number;

    @IsOptional()
    is_active: boolean;
}
