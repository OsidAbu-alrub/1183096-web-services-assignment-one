import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common"
import { Category } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(categoryName: Category["name"]): Promise<Category> {
    const category = await this.prismaService.category.create({
      data: { name: categoryName },
    })
    return category
  }

  async getAllCategories(): Promise<Array<Category>> {
    const categories = await this.prismaService.category.findMany()
    return categories
  }

  async deleteCategory(categoryId: Category["categoryId"]): Promise<void> {
    const deletedCategory = await this.prismaService.category.delete({
      where: {
        categoryId,
      },
    })
    if (!deletedCategory)
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Category with id ${deletedCategory} can't be deleted`,
      })
  }
}
