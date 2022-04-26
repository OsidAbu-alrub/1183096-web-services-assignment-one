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
    const doesExist = await this.prismaService.category.findUnique({
      where: {
        categoryId,
      },
    })

    if (!doesExist)
      throw new InternalServerErrorException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Category with id ${categoryId} was not found`,
      })

    await this.prismaService.category.delete({
      where: {
        categoryId,
      },
    })
  }
}
