import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  id: number;
  name?: string;
  category?: string;
  supplier?: string;
  ready_stock?: boolean;
  price?: number;
}
