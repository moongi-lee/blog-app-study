import {useContext, useEffect, useState} from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {db} from "firebaseApp";
import AuthContext from "../context/AuthContext";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {PostProps} from "./PostList";

export default function PostForm() {

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const {user} = useContext(AuthContext)
  const [ post, setPost ] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const getPost = async (id: string)=>{
    if(id){
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({id:docSnap.id, ...docSnap.data() as PostProps})
    }
  };

  useEffect(()=>{
    if(params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(()=>{
    if(post){
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
    }
  }, [post]);



  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('버튼클릭')
    e.preventDefault();
    if(post && post.id){
      console.log('포스트가 있네. 수정 실행')
      const postRef = doc(db, 'posts', post?.id);
      await updateDoc(postRef, {
        title: title,
        summary: summary,
        content: content,
        updatedAt : new Date()?.toLocaleDateString(),
        email: user?.email,
        uid : user?.uid,
      })
      toast?.success('게시글이 수정되었습니다.');
      navigate(`/posts/${post?.id}`);
    } else {
      try{
        await addDoc(collection(db, 'posts'),{
          title: title,
          summary: summary,
          content: content,
          createdAt : new Date()?.toLocaleDateString(),
          email: user?.email,
        });
        toast?.success('게시글이 작성되었습니다.');
        navigate('/');
      } catch (e) {
        console.log(e)
        toast?.error('게시글 작성에 실패했습니다.');
      }
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: {name, value},
    } = e;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
  }
  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <div className="form__block">
          <label htmlFor="title">제목</label>
          <input type="text" name="title" id="title" required onChange={onChange} value={title} />
        </div>
        <div className="form__block">
          <label htmlFor="summary">요약</label>
          <input type="text" name="summary" id="summary" required onChange={onChange} value={summary} />
        </div>
        <div className="form__block">
          <label htmlFor="content">내용</label>
          <textarea name="content" id="content" required onChange={onChange} value={content} />
        </div>
        <div className="form__block">
          <input type="submit" value={post ? '수정' : '제출'} className="form__btn--submit" />
        </div>
      </form>
    </>
  );
}
