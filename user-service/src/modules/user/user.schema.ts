
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
@Schema({
    timestamps: true
})
export class User {

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ unique: true })
    user_name: string;
}

const UserSchema = SchemaFactory.createForClass(User);



export { UserSchema };
