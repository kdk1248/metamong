// import { Column, Entity, PrimaryColumn } from 'typeorm';
// import { ReviewRequestDto } from '../dto/review-request.dto';

// @Entity()
// export class Review {
//   @PrimaryColumn()
//   id: number;
//   @Column()
//   username: string;
//   @Column()
//   contents: string;

//   constructor(reviewRequestDto?: ReviewRequestDto) {
//     if (reviewRequestDto) {
//       this.username = reviewRequestDto.username;
//       this.contents = reviewRequestDto.contents;
//     }
//   }

//   update(reviewRequestDto: ReviewRequestDto): void {
//     this.username = reviewRequestDto.username;
//     this.contents = reviewRequestDto.contents;
//   }
// }
import{ Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from './common/common.entity';
// import { UserEntity } from './user.entity';
import { ReviewRequestDto } from '../dto/review-request.dto';


@Entity('Review')
export class ReviewEntity extends CommonBigPKEntity{
  @Column('text', {unique: false, nullable: false})
  content:string;
  static id: number;
  static username: string;
  static content: string;

  // @ManyToOne(()=> UserEntity, (user)=> user.comments)
  // @JoinColumn({name: 'userId', referencedColumnName:'id'})
  // user: UserEntity;

  constructor(reviewRequestDto?: ReviewRequestDto) {
    super();
    if (reviewRequestDto) {
      this.content = reviewRequestDto.content;
      // this.user = reviewRequestDto.username;
    }
  }

  update(reviewRequestDto: ReviewRequestDto): void {
    this.content = reviewRequestDto.content;
    // this.user = reviewRequestDto.username;
  }

}
