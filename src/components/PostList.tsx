import {Link} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDocs, query, orderBy, where} from "firebase/firestore";
import {db} from "firebaseApp";
import AuthContext from "context/AuthContext";
import {toast} from "react-toastify";


export interface CommentsInterFace {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category: CategoryType;
  comments?: CommentsInterFace[];
}

type TabType = "all" | "my";

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';
export const CATEGORIES:CategoryType[] = ['Frontend', 'Backend', 'Web', 'Native'];


export default function PostList({ hasNavigation=true, defaultTab = "all" }: PostListProps) {
  const [activeTab, setActiveTap] = useState<TabType | CategoryType>(defaultTab);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);


  const handleDelete = async (id : string)=>{
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if(confirm){
      await deleteDoc(doc(db, "posts", id));
      toast.success('게시글이 삭제되었습니다.');
      getPosts();
    }
  }

  const getPosts = async () => {
    // const datas = await getDocs(collection(db, "posts"));
    setPosts([]);
    let postsRef = collection(db, "posts");
    let postsQuery;

    if(activeTab === "my" && user){
      postsQuery = query(postsRef, where('uid', '==', user.uid), orderBy("createdAt", "asc"));
    } else if (activeTab === "all") {
      postsQuery = query(postsRef, orderBy("createdAt", "asc"))
    } else {
      postsQuery = query(postsRef, where('category', '==', activeTab), orderBy("createdAt", "asc"));
    }

    const datas = await getDocs(postsQuery)
    console.log(datas)
    datas?.forEach((doc) => {
      const dataObj = {...doc.data(), id: doc.id}

      setPosts((prev)=>[...prev, dataObj as PostProps]);
    });
  }

  useEffect(()=>{
    getPosts();
  }, [activeTab]);

  return (
      <>
        {hasNavigation && (
            <div className="post__navigation">
              <div role="presentation" onClick={()=>{ setActiveTap("all") }} className={activeTab === "all" ? "post__navigation--active" : ""}>전체</div>
              <div role="presentation" onClick={()=>{ setActiveTap("my") }} className={activeTab === "my" ? "post__navigation--active" : ""}>나의글</div>
              {CATEGORIES?.map((category) => (
                  <div key={category} role="presentation" onClick={()=>{ setActiveTap(category) }} className={activeTab === category ? "post__navigation--active" : ""}>{category}</div>
              ))}
            </div>
        )}
        <div className="post__list">
          {
              posts?.length > 0 ? (
                  posts?.map((post,index)=>(
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
              ))
            ) : (
                  <div className="post__no-post">게시글이 없습니다.</div>
              )}
        </div>
      </>
  )
}

