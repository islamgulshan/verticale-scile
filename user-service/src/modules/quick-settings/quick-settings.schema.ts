import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { WalletPlainType } from 'src/config/common';

class Plain {
  @Prop({ enum: WalletPlainType })
  type: WalletPlainType;

  @Prop({ default: 0 })
  price: number;
}

class Wallet {
    @Prop({ default: 0 })
    current_amount: number;
  
    @Prop({ type: Plain })
    plain:Plain;

    @Prop({ type: String })
    referal_code:   string;
  }

@Schema({ timestamps: true })
export class QuickSettings extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;
    @Prop({ default: false })
    notification_off: boolean
    @Prop({ default: false })
    connection_request: boolean 
    @Prop({ type: Wallet})
    wallet: Wallet;
}

export const QuickSettingsSchema = SchemaFactory.createForClass(QuickSettings);
