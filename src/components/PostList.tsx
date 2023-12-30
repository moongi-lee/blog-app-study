import {Link} from "react-router-dom";
import {useState} from "react";

interface PostListProps {
  hasNavigation?: boolean;
}

type TabType = "all" | "my";
export default function PostList({ hasNavigation=true }: PostListProps) {

  const [activeTab, setActiveTap] = useState<TabType>("all")
  return (
      <>
        {hasNavigation && (
            <div className="post__navigation">
              <div role="presentation" onClick={()=>{ setActiveTap("all") }} className={activeTab === "all" ? "post__navigation--active" : ""}>전체</div>
              <div role="presentation" onClick={()=>{ setActiveTap("my") }} className={activeTab === "my" ? "post__navigation--active" : ""}>나의글</div>
            </div>
        )}
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
                      <div className="post__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, autem deserunt dicta nesciunt soluta voluptates. Aliquam, assumenda cumque eligendi et ex impedit ipsa ipsum, magnam nulla quas quo repellendus veritatis.</div>
                      <div className="post__utills-box">
                        <div className="post__delete">삭제</div>
                        <div className="post__edit">수정</div>
                      </div>
                    </Link>
                  </div>
              ))
          }
        </div>
      </>
  )
}

