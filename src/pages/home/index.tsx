import {Link} from "react-router-dom";
export default function Home() {
  console.log([...Array(10)].map((e, index)=>{
    return <div key={index} className='post__box'>게시글 {index}</div>
  }))

  return (
      <div>
        <header>
          <div>
            <Link to="/posts/new">글쓰기</Link>
            <Link to="/posts/">게시글</Link>
            <Link to="/profile">프로필</Link>
          </div>
        </header>
        <div className="post__navigation">
          <div className="post__navigation--active">전체</div>
          <div>나의글 </div>
        </div>
        <div className="post__list">
          {
            [...Array(10)].map((e,index)=>(
                <div key={index} className="post__box" >
                  <Link to={`/posts/${index}`}>
                    <div className="post__profile-box">
                      <div className="post__profile"/>
                      <div className="post__author-name">박지봉</div>
                      <div className="post__date">2023.07.08 토요일</div>
                    </div>
                    <div className="post__title">게시글 {index}</div>
                    <div className="post__text">안녕하세요 저는 이문기 친구 박지봉 입니다.</div>
                    <div className="post__utills-box">
                      <div className="post__delete">삭제</div>
                      <div className="post__edit">수정</div>
                    </div>
                  </Link>
                </div>
            ))
          }
        </div>
        <footer>
          <Link to="/posts/new">글쓰기</Link>
          <Link to="/posts/">게시글</Link>
          <Link to="/profile">프로필</Link>
        </footer>
      </div>
  )
}