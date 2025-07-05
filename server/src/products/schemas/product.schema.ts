import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  imgUrl?: string;

  @Prop({ required: true, type: Number })
  lastPrice: number;

  @Prop({ required: true, type: Number })
  timeStamp: Date;

  @Prop({ required: true, type: Number })
  targetPrice: number;
}
