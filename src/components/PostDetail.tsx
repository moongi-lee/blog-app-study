import {Link, useNavigate, useParams} from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import {useEffect, useState} from "react";
import {PostProps} from "./PostList";
import {db} from "../firebaseApp";
import Loader from "./Loader";
import {toast} from "react-toastify";




export default function PostDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [ post, setPost ] = useState<PostProps | null>(null);

  const getPost = async (id: string)=>{
    if(id){
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({id:docSnap.id, ...docSnap.data() as PostProps})
    }
  };

  const handleDelete = async ()=>{
    console.log('delete!')
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if(confirm && post && post.id){
      await deleteDoc(doc(db, "posts", post.id));
      toast.success('게시글이 삭제되었습니다.');
      navigate('/');
    }
  }

  useEffect(()=>{
    if(params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
      <>
        <div className="post__detail">
          {post ?
          <div className="post__box">
            <div className="post__title">{post?.title}</div>
            <div className="post__profile-box">
              <div className="post__profile"/>
              <div className="post__author-name">{post?.email}</div>
              <div className="post__date">{post?.createdAt}</div>
            </div>
            <div className="post__utills-box">
              <div className="post__delete" role="presentation" onClick={handleDelete}>삭제</div>
              <div className="post__edit">
                <Link to={`/posts/edit/${post?.id}`}>수정</Link>
              </div>
            </div>
            <div className="post__text post__text--pre-wrap">{post?.content}</div>
          </div>
              : <Loader/>}
        </div>
      </>
  )
}