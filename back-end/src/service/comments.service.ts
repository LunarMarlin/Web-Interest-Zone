import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Comments } from '../entity/comments.entity';
import { Repository } from 'typeorm';

@Provide()
export class CommentsService {

    @InjectEntityModel(Comments)
    Comment: Repository<Comments>;

    // save
    async create(post: number, creator: number, content: string): Promise<Comments | null> {
        // create a entity object
        let comment = new Comments();
        comment.post = post;
        comment.content = content;
        comment.creator = creator;
        // save entity
        return await this.Comment.save(comment);

    }

    async getAllFromPost(post: number): Promise<Comments[]> {
        return this.Comment.find({
            where: {
                post: post
            },
            order: {
                likes: 'ASC'
            }
        })
    }
}