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
    async getUserByName(username: string): Promise<Userinfo | null> {
        return await this.UserModel.findOne({ where: { username: username } });
    }

    async getUserByID(ID: number) {
        return this.UserModel.findOne({
            where: {
                id: ID
            }
        })
    }

    async checkUsername(username: string): Promise<boolean> {
        const user = await this.UserModel.findOne({ where: { username: username } });
        return !user;
    }
    async checkEmail(email: string): Promise<boolean> {
        const user = await this.UserModel.findOne({ where: { email: email } });
        return !user;
    }
}