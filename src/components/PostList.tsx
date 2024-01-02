import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../firebaseApp";
import AuthContext from "../context/AuthContext";
import {toast} from "react-toastify";


interface PostListProps {
  hasNavigation?: boolean;
}

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
}

type TabType = "all" | "my";


export default function PostList({ hasNavigation=true }: PostListProps) {
  const [activeTab, setActiveTap] = useState<TabType>("all")
  const [posts, setPosts] = useState<PostProps[]>([]);
  const {user} = useContext(AuthContext);


  const handleDelete = async (id : string)=>{
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if(confirm){
      await deleteDoc(doc(db, "posts", id));
      toast.success('게시글이 삭제되었습니다.');
      getPosts();
    }
  }

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));
    setPosts([]);
    datas?.forEach((doc) => {
      const dataObj = {...doc.data(), id: doc.id}
      setPosts((prev)=>[...prev, dataObj as PostProps]);
    });
  }

  useEffect(()=>{
    getPosts();
  }, []);

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
              posts?.length > 0 ? posts?.map((post,index)=>(
                  <div key={post?.id} className="post__box" >
                    <Link to={`/posts/${post?.id}`}>
                      <div className="post__profile-box">
                        <div className="post__profile"/>
                        <div className="post__author-name">{post?.email}</div>
                        <div className="post__date">{post?.createdAt}</div>
                      </div>
                      <div className="post__title">{post?.title}</div>
                    </Link>
                      <div className="post__text">{post?.summary}</div>
                      {post?.email === user?.email && (
                        <div className="post__utills-box">
                          <div className="post__delete" role="presentation" onClick={()=>handleDelete(post.id as string)}>삭제</div>
                          <div className="post__edit">
                            <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                          </div>
                        </div>
                      )}
                  </div>
              )) :  (
                  <div className="post__no-post">게시글이 없습니다.</div>
              )

          }
        </div>
      </>
  )
}

