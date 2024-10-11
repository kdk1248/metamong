export class FavoriteRequestDto {
  userId: number;         // 관심 항목 추가를 요청하는 사용자의 ID
  movieId?: number;       // 관심 항목으로 추가할 영화의 ID
  commentId?: number;     // 관심 항목으로 추가할 댓글의 ID
  collectionId?: number;  // 관심 항목으로 추가할 컬렉션의 ID
}