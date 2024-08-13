import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Zones } from '../entity/zones.entity';
import { Repository } from 'typeorm';

@Provide()
export class ZonesService {

    @InjectEntityModel(Zones)
    Zone: Repository<Zones>;

    // save
    async create(name: string, introduction: string, category: string, creator: number): Promise<Zones | null> {
        // create a entity object
        let zone = new Zones();
        zone.name = name;
        zone.introduction = introduction;
        zone.category = category;
        zone.creator = creator;
        zone.contents_count = 0;
        // save entity
        return await this.Zone.save(zone);

    }

    async getAll(): Promise<Zones[]> {
        return this.Zone.find({
            order: {
                id: 'ASC'
            }
        })
    }

    async getByID(zoneID: number): Promise<Zones> {
        return this.Zone.findOne({
            where: {
                id: zoneID
            }
        })
    }

    async updatePostCount(zoneID: number): Promise<void> {
        const target = await this.Zone.findOne({
            where: {
                id: zoneID
            }
        });
        target.contents_count += 1;
        this.Zone.save(target);
    }
}