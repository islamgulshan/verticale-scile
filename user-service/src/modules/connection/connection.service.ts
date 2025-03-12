import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection } from './connection.schema';
import { Model } from 'mongoose';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel(Connection.name)
    private ConnectionModel: Model<Connection>,
  ) {}
  async connect(dto: Partial<Connection>): Promise<Connection> {
    return this.ConnectionModel.findOneAndUpdate(
      { user_id: dto['user_id'] },
      {
        $addToSet: { connection_List: dto['connection_id'] },
        $pull: { connection_pending_List: dto['connection_id'] },
      },
      { new: true, upsert: true },
    );
  }

  async request(dto: Partial<Connection>): Promise<Connection> {
    return this.ConnectionModel.findOneAndUpdate(
      { user_id: dto['user_id'] },
      { $addToSet: { connection_pending_List: dto['connection_id'] } },
      { new: true, upsert: true },
    );
  }

  async remove(dto: Partial<Connection>): Promise<Connection> {
    return this.ConnectionModel.findOneAndUpdate(
      { user_id: dto['user_id'] },
      {
        $pull: {
          connection_pending_List: dto['connection_id'],
          connection_List: dto['connection_id'],
        },
      },
      { new: true, upsert: true },
    );
  }
  async getConnections(user_id: string): Promise<Connection> {
    return this.ConnectionModel.findOne({ user_id: user_id })
      .select('connection_List')
      .populate({
        path: 'connection_List',
        select: 'email name user_name profile',
        populate: {
          path: 'profile',
          select: 'profile_picture',
        },
      });
  }

  async getConnectionRequest(user_id: string): Promise<Connection> {
    const data = await this.ConnectionModel.findOne({ user_id: user_id })
      .select('connection_pending_List')
      .populate({
        path: 'connection_pending_List',
        select: 'email name user_name profile',
        populate: {
          path: 'profile',
          select: 'profile_picture',
        },
      });
    console.log(data);
    return data;
  }
}
