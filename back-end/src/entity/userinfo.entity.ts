import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class Userinfo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    sign_up_at: Date;
    @Column()
    password: string;
}