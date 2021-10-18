import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PassegerModule } from './passeger/passeger.module';
import { FlightModule } from './flight/flight.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath:['.env.development'], isGlobal : true }),
    MongooseModule.forRoot(process.env.URI_MONGODB),
    UserModule,
    PassegerModule,
    FlightModule,
    AuthModule
    
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
