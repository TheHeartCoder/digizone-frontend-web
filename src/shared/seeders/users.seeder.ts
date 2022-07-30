import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schema/users';
import { Seeder } from 'nestjs-seeder';
import { generateHashPassword } from '../utility/password-manager';
import { admins } from 'src/data/admin';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectModel(Users.name) private readonly user: Model<Users>) {}

  async seed(): Promise<any> {
    // import { Seeder, DataFactory } from 'nestjs-seeder';
    // const users = DataFactory.createForClass(Users).generate(1);
    // generate hash password and then save the user in database.
    for (const user of admins) {
      user.password = await generateHashPassword(user.password + '');
      const emailExists = await this.user.findOne({ email: user.email });
      if (!emailExists) {
        await this.user.create(user);
      }
    }
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
