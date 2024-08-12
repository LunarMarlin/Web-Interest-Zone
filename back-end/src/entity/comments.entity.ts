import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    content: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @Column()
    creator: number;
    @Column()
    post: number;
    @Column()
    likes: number;
}