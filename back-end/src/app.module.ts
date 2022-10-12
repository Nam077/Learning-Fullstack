import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModuleConfig } from './database/config';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ImageModule } from './image/image.module';
@Module({
    imports: [AccountModule, TypeOrmModuleConfig, ProductModule, CategoryModule, ImageModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
