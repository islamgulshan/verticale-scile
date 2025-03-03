import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class AccountVerification {
  @Prop()
  license: String;

  @Prop()
  reasons: string[];
}

class persnal_information {
    @Prop()
    full_name: string;
  
    @Prop()
    date_of_birth:String;

    @Prop()
    gender: string;
  }

@Schema({ timestamps: true })
export class Accounts extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ type: persnal_information})
    persnal_information: persnal_information;
    @Prop()
    langauge: string
    @Prop({ type: AccountVerification })
    account_verification: AccountVerification 
    @Prop({default:false})
    suggested_content: boolean
    @Prop({default:false})
    auto_content: boolean
    @Prop()
    interust: string
    @Prop()
    location: string
    @Prop()
    gender_and_age: string
    @Prop({default:"active"})
    status: string
    @Prop()
    de_activation_reason:string

}

export const AccountsSchema = SchemaFactory.createForClass(Accounts);
