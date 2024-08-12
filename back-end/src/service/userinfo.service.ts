import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Userinfo } from '../entity/userinfo.entity';
import { Repository } from 'typeorm';

@Provide()
export class UserinfoService {

    @InjectEntityModel(Userinfo)
    UserModel: Repository<Userinfo>;

    // save
    async register(username: string, email: string, password: string): Promise<Userinfo | null> {
        // create a entity object
        let user = new Userinfo();
        user.username = username;
        user.password = password;
        user.email = email;
        // save entity
        return await this.UserModel.save(user);
    }
    async login(username: string, password: string): Promise<Userinfo | null> {
        const a = await this.UserModel.findOne({ where: { username: username, password: password } });
        return a;
    }

    async getUserByID(ID: number) {
        return this.UserModel.findOne({
            where: {
                id: ID
            }
        })
    }
}