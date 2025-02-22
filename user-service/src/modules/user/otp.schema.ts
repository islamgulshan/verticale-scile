
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type OtpDocument = Otp & Document;
@Schema({
    timestamps: true
})
export class Otp {
    @Prop({ unique: true })
    email: string;

    @Prop()
    otp: string;

    @Prop()
    expireIn: number;

}

const OtpSchema = SchemaFactory.createForClass(Otp);



export { OtpSchema };
