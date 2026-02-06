import { Category } from '@/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.create(createCategoryDto as any);
  }

  async findAll(): Promise<{ data: Category[]; total: number }> {
    const { rows, count } = await this.categoryRepository.findAndCountAll();
    return {
      data: rows,
      total: count,
    };
  }

  async findOne(id: number): Promise<Category | null> {
    return await this.categoryRepository.findByPk(id);
  }
}
