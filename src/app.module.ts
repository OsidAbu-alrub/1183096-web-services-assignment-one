import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { ProductModule } from "./product/product.module"
import { PrismaModule } from "src/prisma/prisma.module"
import { CategoryModule } from "./category/category.module"

// this is the entry point
// if you dont import modules here, you will not be able
// to use them in your application
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
