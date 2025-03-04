
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({
    timestamps: true
})
export class LoginDetail extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop()
    device: string;
    @Prop()
    loginTime: string;
    @Prop()
    location: string;

}

const LoginDetailSchema = SchemaFactory.createForClass(LoginDetail);
export { LoginDetailSchema };
