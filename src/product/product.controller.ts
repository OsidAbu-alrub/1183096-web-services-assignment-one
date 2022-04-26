import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common"
import { Product } from "@prisma/client"
import BaseResponse, { ValidationResponse } from "src/BaseResponse"
import { ProductService } from "./product.service"

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("add")
  async addProduct(
    @Body("name") productName: Product["name"],
  ): Promise<BaseResponse<Product["productId"]>> {
    const createdProductId = await this.productService.createProduct(
      productName,
    )
    return {
      validation: {
        message: "",
        statusCode: HttpStatus.OK,
      },
      data: createdProductId,
    }
  }

  @Get("all")
  async getAllProducts(): Promise<BaseResponse<Product[]>> {
    const products = await this.productService.getAllProducts()
    return {
      validation: {
        message: "",
        statusCode: HttpStatus.OK,
      },
      data: products,
    }
  }

  @Get(":id")
  async findProduct(
    @Param("id") productId: string,
  ): Promise<BaseResponse<Product>> {
    try {
      const product = await this.productService.findProduct(+productId)
      return {
        validation: {
          message: "",
          statusCode: HttpStatus.OK,
        },
        data: product,
      }
    } catch (e: unknown) {
      const error = e as HttpException
      return {
        validation: { ...(error.getResponse() as ValidationResponse) },
        data: null,
      }
    }
  }
}
