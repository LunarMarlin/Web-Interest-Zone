import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Zones {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @Column()
    creator: number;
    @Column()
    contents_count: number;
    @Column()
    category: string;
    @Column()
    introduction: string;
}