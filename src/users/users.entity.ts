import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255, unique: true, nullable: false })
  email: string

  @Column('varchar', { length: 255, nullable: false })
  password: string

  @Column('boolean', { nullable: false, default: false })
  banned: boolean

  @Column('text')
  banReason: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
