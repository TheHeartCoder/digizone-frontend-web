import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './shared/schema/users';
import { UsersSeeder } from './shared/seeders/users.seeder';
import config from 'config';
import { Products, ProductSchema } from './shared/schema/products';
import { ProductSeeder } from './shared/seeders/products.seeder';

seeder({
  imports: [
    MongooseModule.forRoot(config.get('mongoDbUrl')),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
  ],
}).run([UsersSeeder, ProductSeeder]);
