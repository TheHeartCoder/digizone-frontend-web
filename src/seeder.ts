import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './shared/schema/users';
import { UsersSeeder } from './shared/seeders/users.seeder';
import config from 'config';

seeder({
  imports: [
    MongooseModule.forRoot(config.get('mongoDbUrl')),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
}).run([UsersSeeder]);
