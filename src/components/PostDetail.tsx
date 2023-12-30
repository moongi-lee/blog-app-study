import {Link} from "react-router-dom";

export default function PostDetail() {
  return (
      <>
        <div className="post__detail">
          <div className="post__box">
            <div className="post__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div className="post__profile-box">
              <div className="post__profile"/>
              <div className="post__author-name">박지봉</div>
              <div className="post__date">2023.07.08 토요일</div>
            </div>
            <div className="post__utills-box">
              <div className="post__delete">삭제</div>
              <div className="post__edit">
                <Link to={`/posts/edit/1`}>수정</Link>
              </div>
            </div>
            <div className="post__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, autem deserunt dicta nesciunt soluta voluptates. Aliquam, assumenda cumque eligendi et ex impedit ipsa ipsum, magnam nulla quas quo repellendus veritatis.</div>
          </div>
        </div>
      </>
  )
}