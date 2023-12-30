import {Link} from "react-router-dom";
import PostList from "./PostList";
export default function Profile() {
  return (
      <>
        <div className="profile__box">
          <div className="flex__box-lg">
            <div className="profile__image"></div>
            <div>
              <div className="profile__email">leemoon91@naver.com</div>
              <div className="profile__name">이문기</div>
            </div>
          </div>
          <Link to="/" className="profile__logout">로그아웃</Link>
        </div>
      </>
  )
}

