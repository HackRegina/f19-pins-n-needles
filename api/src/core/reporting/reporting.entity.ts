import { Point } from 'geojson';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('reportings')
export class ReportingEntity {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar')
  email?: string;

  @Column('varchar')
  phone?: string;

  @Column('varchar')
  description?: string;

  @Column({ type: 'varchar', name: 'photo_url' })
  photoUrl: string;

  @Column({ type: 'varchar', name: 'place_id' })
  placeId?: string;

  @Column({ type: 'geometry', name: 'geog' })
  geolocation: Point;

  @Column('varchar')
  address?: string;

  @ManyToOne(type => UserEntity, user => user.reportings, {eager: true})
  @JoinColumn({ name: 'picked_up_by', referencedColumnName: 'id' })
  pickedUpBy?: UserEntity;

  @Column({type: 'timestamp', update: false})
  created: Date;

  @Column('timestamp')
  updated: Date;
}
