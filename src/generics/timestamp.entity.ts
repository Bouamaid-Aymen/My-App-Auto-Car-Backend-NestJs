import { CreateDateColumn,  UpdateDateColumn, DeleteDateColumn} from "typeorm";

export class TimeStampEntity {
    @CreateDateColumn()
    CreatedAt: Date;

    @UpdateDateColumn()
    UpdatedAt: Date;

    @DeleteDateColumn()
    DeletedAt: Date;
}