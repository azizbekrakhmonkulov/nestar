import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator"
import { MemberAuthType, MemberType } from "../../enums/member.enum";
import { ViewGroup } from "../../enums/view.enum";
import type { ObjectId } from "mongoose";


@InputType()
export class ViewInput {
    @IsNotEmpty()
    @Field(() => ViewGroup)
    viewGroup: string;

    @IsNotEmpty()
    @Field(() => String)
    memberId: ObjectId;

    @IsNotEmpty()
    @Field(() => String)
    viewRefId: ObjectId;
}