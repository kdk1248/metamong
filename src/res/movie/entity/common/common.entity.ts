import{
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,

}from 'typeorm';

export class CommonBigPKEntity{
    @PrimaryGeneratedColumn({type:'bigint'}) // 기본키를 만드는 칼럼
    id:number; //꾸밈 당함 auto increment가 적용된 pk인 id라는 칼럼

    @CreateDateColumn({type: 'timestamp'}) // 생성일자 적용 칼럼
    createdAt?: Date; // create 되었을 때 자동으로 생성일자 넣음

    @UpdateDateColumn({type: 'timestamp', nullable:true}) //update 쿼리를 날릴 때, 자동으로 수정일자 넣어줌
    updateAt?: Date | null; //updatedAt 칼럼

    @DeleteDateColumn({type: 'timestamp', nullable:true})//Soft Delete를 위한 칼럼
    deletedAt?: Date | null;

    // constructor(movieRequest)
}