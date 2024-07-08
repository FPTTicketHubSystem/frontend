import 'bootstrap/dist/css/bootstrap.css';
import '../assets/Forum.css';
import '../assets/Style.css';
import Header from '../Layout/User/Header';
import Footer from './Footer';
import CreatePost from './ForumComponent/CreatePost';
import PostDetails from './ForumComponent/PostDetails';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../context/PostContext';
import FilterPost from './ForumComponent/FilterPost';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PostStatusTab from './ForumComponent/PostStatusTab';
import Spinner from '../common/Spinner/Spinner';
import PostList from './PostList';
import { getCommentsByPostService } from '../services/commentService';

export default function Forum() {
    const { loading, posts, getAllPost, getPostByStatus, getSavedPost } = useContext(PostContext);
    const { user } = useContext(UserContext);
    const [searchParams] = useSearchParams();
    const statusQueryParam = searchParams.get('status');
    const [comments, setComments] = useState([]);

    const statusList = [
        { id: 1, title: 'Tất cả bài viết' },
        { id: 5, name: 'Saved', title: 'Đã lưu' },
    ];

    useEffect(() => {
        if (statusQueryParam) {
            if (statusQueryParam === 'Saved') {
                getSavedPost(user.accountId);
            } 
        } else {
            getAllPost();
        }
    }, [statusQueryParam, user.accountId]);

    return (
        <>
            <Header />
            <div className='body-forum'>
                <div className='container'>
                    <CreatePost />
                    <div className='post-filter-container'>
                        <FilterPost />
                        {user && <PostStatusTab statusList={statusList} />}
                    </div>
                    <div className='post-container'>
                        {loading ? <Spinner /> : <PostList posts={posts} />}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
