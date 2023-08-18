import { Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    title: string
    
    @Column()
    description: string

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    modify: Date
    
    @Column()
    archived: boolean
    
    @Column("simple-array",{nullable: true})
    categories: string[]
}