import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common"
import { Category } from "@prisma/client"
import BaseResponse, { ValidationResponse } from "src/BaseResponse"
import { CategoryService } from "./category.service"

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * add category to database
   *
   * @param categoryName
   * @returns categoryId - the ID of the created category
   */
  @Post("add")
  async addCategory(
    @Body("categoryName") categoryName: Category["name"],
  ): Promise<BaseResponse<Category>> {
    const createdCategory = await this.categoryService.createCategory(
      categoryName,
    )
    return {
      validation: {
        message: "",
        statusCode: HttpStatus.OK,
      },
      data: createdCategory,
    }
  }

  /**
   * get all categories from database
   *
   * @returns categories - all categories in database
   */
  @Get("all")
  async getAllCategories(): Promise<BaseResponse<Category[]>> {
    const categories = await this.categoryService.getAllCategories()
    return {
      validation: {
        message: "",
        statusCode: HttpStatus.OK,
      },
      data: categories,
    }
  }

  /**
   * delete category from database
   *
   * @param categoryId - the category ID to be deleted
   */
  @Delete(":id")
  async deleteCategory(
    @Param("id") categoryId: string,
  ): Promise<BaseResponse<string>> {
    try {
      await this.categoryService.deleteCategory(+categoryId)
      return {
        validation: {
          message: "",
          statusCode: HttpStatus.OK,
        },
        data: `Category with id ${categoryId} was deleted successfully`,
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
