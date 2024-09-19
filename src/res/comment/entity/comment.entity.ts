import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonBigPKEntity } from 'src/res/common/entity/common.entity';
import { CommentRequestDto } from '../dto/comment-request.dto';
import { User } from 'src/res/user/entity/user.entity';

@Entity()
export class Comment extends CommonBigPKEntity { // 공통적으로 사용하는 엔티티
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('text', { unique: false, nullable: false })
  content: string; //리뷰 내용 저장 

  @ManyToOne(() => User, (user) => user.comments) // 리뷰와 사용자 간의 다대일 관계
  user: User; // 리뷰를 작성한 사용자 
  
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' }) //외래 키의 칼럼 , userId라는 외래 키를 사용하여 User 엔터티의 id 칼럼과 연결
  replies: any; //대댓글

  constructor(commentRequestDto: CommentRequestDto) { // 리뷰요청에서 가져오는 생성자 
    super();
    if (commentRequestDto) {
      this.content = commentRequestDto.content; //리뷰오청에 있는 내용을 여기로 끌고 옴
      this.user = { id: commentRequestDto.user } as unknown as User; // 리뷰요청에 있는 사용자를 여기로 끌고 옴 곧 id를 끌고 온다는거겠지 
    }
  }

  update(commentRequestDto: CommentRequestDto): void { //리뷰요청에 있는 업데이트 -> 수정
    this.content = commentRequestDto.content; // 리뷰요청에 있는 내용 
    this.user = { id: commentRequestDto.user } as unknown as User;
  }
}