import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import helmet from "helmet"

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  console.log(`Application started on http://localhost:${PORT}/`)
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  await app.listen(PORT)
}
bootstrap()
