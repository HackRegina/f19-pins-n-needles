import * as bcrypt from 'bcrypt-nodejs';
import { Column, Entity, PrimaryGeneratedColumn, ValueTransformer, OneToMany } from 'typeorm';
import { ReportingEntity } from '../reporting/reporting.entity';

export const encrypt: ValueTransformer = {
  to: (entityValue: string) => {
      return entityValue ? bcrypt.hashSync(entityValue, bcrypt.genSaltSync()) : null;
  },
  from: (databaseValue: string) => {
      return databaseValue;
  },
};

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar')
  email: string;

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', name: 'picture_url' })

  @Column({type: 'varchar', transformer: [encrypt]})
  password?: string;

  @OneToMany(type => ReportingEntity, reporting => reporting.pickedUpBy)
  reportings?: ReportingEntity[];

  @Column({type: 'timestamp', update: false})
  created: Date;

  @Column('timestamp')
  updated?: Date;

  verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
