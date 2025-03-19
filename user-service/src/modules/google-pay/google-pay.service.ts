// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import axios from 'axios';

// @Injectable()
// export class GooglePayService {
//   private readonly merchantId: string;
//   private readonly apiKey: string;

//   constructor(private configService: ConfigService) {
//     // this.merchantId = this.configService.get<string>('GOOGLE_PAY_MERCHANT_ID');
//     // this.apiKey = this.configService.get<string>('GOOGLE_PAY_API_KEY');
//     this.merchantId = 'BCR2DN4T76VYP5TH';
//     this.apiKey = 'AIzaSyCWpbRwjtbcDyI-IGT8h0uXHiNMMuRbSKY';
//   }

//   async processPayment(paymentData: any): Promise<any> {
//     const url = 'https://pay.googleapis.com/v1/payments';
//     const headers = {
//       Authorization: `Bearer ${this.apiKey}`,
//       'Content-Type': 'application/json',
//     };

//     const payload = {
//       merchantId: this.merchantId,
//       paymentData,
//     };
//     return axios.post(url, payload, { headers });
//   }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QuickSettingsService } from '../quick-settings/quick-settings.service';
import { InjectModel } from '@nestjs/mongoose';
import { GooglePay } from './google-pay.schema';
import { Model } from 'mongoose';

@Injectable()
export class GooglePayService {
  private readonly merchantId: string;

  constructor(
    private configService: ConfigService,
    private quickSettingService: QuickSettingsService,
    @InjectModel(GooglePay.name)
    private GooglePayModel: Model<GooglePay>,
  ) {
    this.merchantId = 'BCR2DN4T76VYP5TH'; // Replace with your Google Pay Merchant ID
  }

  async processPayment(amount: number, currency: string): Promise<string> {
    // Generate a payment request
    const paymentRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['VISA', 'MASTERCARD'],
          },
          tokenizationSpecification: {
            type: 'DIRECT',
            parameters: {
              protocolVersion: 'ECv2',
              publicKey: 'tariqkeyabcddddd', // Replace with your public key
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: this.merchantId,
        merchantName: 'FOS Social App',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: amount.toFixed(2),
        currencyCode: currency,
        countryCode: 'US',
      },
    };

    // Return the payment screen URL
    const paymentScreenUrl = `https://pay.google.com/gp/p/ui/pay?paymentRequest=${encodeURIComponent(
      JSON.stringify(paymentRequest),
    )}&callbackUrl=${encodeURIComponent('https://fos-backend.com/payment/callback')}`;
    console.log(paymentScreenUrl);
    return paymentScreenUrl;
  }

  async handlePaymentCallback(paymentData: any): Promise<any> {
    // Process the payment callback
    console.log('Payment Callback Data:', paymentData);

    // Add your logic to handle payment success or failure
    if (paymentData.status === 'SUCCESS') {
      return { success: true, message: 'Payment successful' };
    } else {
      return { success: false, message: 'Payment failed' };
    }
  }

  async subscription(dto: Partial<GooglePay>): Promise<GooglePay> {
    const data = await this.GooglePayModel.create(dto);
    this.quickSettingService.addPackage({
      user_id: data.user_id,
      wallet: {
        subscription: data['_id'],
        package: dto.package,
      } as any,
    });
    return data;
  }

  async get(): Promise<GooglePay[]> {
    const data = await this.GooglePayModel.find().populate({
      path: 'user_id',
      select: '-password',
      populate: {
        path: 'profile',
      },
    });
    return data;
  }

  async cancel(id: string): Promise<GooglePay> {
    const data = await this.GooglePayModel.findByIdAndUpdate(
      { _id: id },
      { $set: { status: 'cancelled' } },
      { new: true },
    );
    return data;
  }
}
