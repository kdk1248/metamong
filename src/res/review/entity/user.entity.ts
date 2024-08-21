// import { Entity, OneToMany } from 'typeorm';
// import { ReviewEntity } from './Review.entity';
// import { CommonBigPKEntity } from './common/common.entity';
// // 
// @Entity('User')
// export class UserEntity extends CommonBigPKEntity {
//     //가져와야하ㅏㅁ
//     @OneToMany(() => ReviewEntity, (review) => review.user)
//     reviews: ReviewEntity[];
//     //@OneToMany(()=> 관계를 맺은 테이블 calss, (관계를 맺은 테이블의 별칭/ 즉, 아무거나 내가 원하는 변수명 입력)=>별칭. 
//     //관계를 맺은 테이블 class에서 현재 Entity의 별칭/변수명)
// }