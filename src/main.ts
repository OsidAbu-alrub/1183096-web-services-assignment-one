import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import helmet from "helmet"
import { PrismaService } from "./prisma/prisma.service"

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  console.log(`Application started on http://localhost:${PORT}/`)
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api/v1")
  app.use(helmet())
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)
  await app.listen(PORT)
}
bootstrap()
