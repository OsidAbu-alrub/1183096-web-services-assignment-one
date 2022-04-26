import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common"
import { Product, ProductCategory } from "@prisma/client"
import BaseResponse, { ValidationResponse } from "src/BaseResponse"
import { ProductCategoryService } from "./product-category.service"

@Controller("product-category")
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post("link")
  async addProduct(
    @Body("categoryId") categoryId: ProductCategory["categoryId"],
    @Body("productId") productId: ProductCategory["productId"],
  ): Promise<BaseResponse<string>> {
    try {
      await this.productCategoryService.addProductToCategory(
        categoryId,
        productId,
      )
      return {
        validation: {
          message: "",
          statusCode: HttpStatus.OK,
        },
        data: "Product added to category successfully",
      }
    } catch (e: unknown) {
      const error = e as HttpException
      return {
        validation: { ...(error.getResponse() as ValidationResponse) },
        data: null,
      }
    }
  }

  @Get(":categoryId")
  async getProductsByCategory(
    @Param("categoryId") categoryId: string,
  ): Promise<BaseResponse<Product[]>> {
    try {
      const products =
        await this.productCategoryService.getProductsLinkedToCategory(
          +categoryId,
        )
      return {
        validation: {
          message: "",
          statusCode: HttpStatus.OK,
        },
        data: products,
      }
    } catch (e: unknown) {
      if (e instanceof HttpException) {
        const error = e as HttpException
        return {
          validation: { ...(error.getResponse() as ValidationResponse) },
          data: null,
        }
      }
      return {
        validation: {
          message: "Internal Server Error",
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        data: null,
      }
    }
  }
}
