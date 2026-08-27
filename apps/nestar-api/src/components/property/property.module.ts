import { Module } from '@nestjs/common';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';
import PropertySchema from '../../schemas/Property.model';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewModule } from '../view/view.module';
import { Member } from '../../libs/dto/member/member';
import { MemberModule } from '../member/member.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Property", schema: PropertySchema }]), AuthModule, ViewModule, MemberModule],
  providers: [PropertyResolver, PropertyService]
})
export class PropertyModule { }
