import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialTypeModule } from './material-type/material-type.module';
import { MaterialModule } from './material/material.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [MaterialTypeModule, MaterialModule, SupplierModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
