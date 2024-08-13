import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Posts } from '../entity/posts.entity';
import { Repository, In, FindOptionsWhere } from 'typeorm';

@Provide()
export class PostsService {

    @InjectEntityModel(Posts)
    Post: Repository<Posts>;

    // save
    async create(title: string, introduction: string, zone: number, creator: number, content: string): Promise<Posts | null> {
        // create a entity object
        let post = new Posts();
        post.title = title;
        post.introduction = introduction;
        post.zone = zone;
        post.content = content;
        post.creator = creator;
        post.likes = 0;
        // save entity
        return await this.Post.save(post);

    }

    async getAll(zones: number[], user: number): Promise<Posts[]> {
        const whereClause: FindOptionsWhere<Posts> = {};
        if (zones?.length > 0) {
            whereClause.zone = In(zones);
        }
        if (user) {
            whereClause.creator = user;
        }
        return this.Post.find({
            where: whereClause,
            order: {
                created_at: 'DESC'
            },
        })
    }
    async getByID(postID: number): Promise<Posts> {
        return this.Post.findOne({
            where: {
                id: postID
            }
        })
    }

    async getByZone(zoneID: number): Promise<Posts[]> {
        return this.Post.find({
            where: {
                zone: zoneID
            }, order: {
                created_at: 'DESC'
            },
        })
    }

    async updateCommentCount(postID: number): Promise<void> {
        const target = await this.Post.findOne({
            where: {
                id: postID
            }
        });
        target.replies_count += 1;
        this.Post.save(target);
    }
}