import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ProductModule } from "./product/product.module"
import { PrismaModule } from "src/prisma/prisma.module"
import { CategoryModule } from "./category/category.module"
import { ProductCategoryModule } from "./product-category/product-category.module"

// this is the entry point
// if you dont import modules here, you will not be able
// to use them in your application
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ProductModule,
    CategoryModule,
    ProductCategoryModule,
  ],
})
export class AppModule {}
