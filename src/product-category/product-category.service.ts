import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common"
import { Category, Product } from "@prisma/client"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async addProductToCategory(
    categoryId: number,
    productId: number,
  ): Promise<void> {
    const isDuplicate = await this.prismaService.productCategory.findFirst({
      where: {
        categoryId,
        productId,
      },
    })
    if (isDuplicate)
      throw new BadRequestException({
        message: "Product already linked to this category",
        statusCode: HttpStatus.BAD_REQUEST,
      })
    await this.prismaService.productCategory.create({
      data: {
        categoryId,
        productId,
      },
    })
  }

  async getProductsLinkedToCategory(
    categoryId: Category["categoryId"],
  ): Promise<Array<Product>> {
    const products = (
      await this.prismaService.productCategory.findMany({
        where: {
          categoryId,
        },
        select: {
          product: true,
        },
      })
    ).map(({ product }) => product)
    return products
  }
}
