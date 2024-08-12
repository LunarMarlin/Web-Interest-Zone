import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    content: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @Column()
    creator: number;
    @Column()
    zone: number;
    @Column()
    introduction: string;
    @Column()
    likes: number;
    @Column()
    replies_count: number;
}