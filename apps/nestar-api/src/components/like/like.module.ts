import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PropertyModule } from '../property/property.module';
import LikeSchema from '../../schemas/Like.model';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from './like.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }]),
        AuthModule,
        MemberModule,
        PropertyModule,
    ],
    providers: [LikeService],
    exports: [LikeService],
})
export class LikeModule { }
