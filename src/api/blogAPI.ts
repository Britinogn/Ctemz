import api from './api';
import { Blog } from '../types/script';

interface BlogsResponse{
    message?: string;
    blogs?: Blog []
    data?: Blog[]
}

interface BlogResponse{
    message?: string;
    blog?: Blog ;
    data?: Blog;
}


async function getAllBlogs(): Promise<Blog[]>{
    const res: BlogsResponse = await api.get('/blogs')
    return(res.blogs || res.data || []) as Blog[]
}

async function getBlogById(id: string): Promise<Blog>{
    const res: BlogResponse = await api.get(`/blogs/${id}`)
    return (res.blog || res.data ) as Blog;
}

async function createBlog(BlogData: Partial<Blog> | FormData): Promise<Blog> {
    const res: BlogResponse = await api.post('/blogs',BlogData );
    return (res.blog || res.data) as Blog
}

async function updateBlog(  id: string ,  BlogData: Partial<Blog> | FormData): Promise<Blog> {
    const res: BlogResponse = await api.put(`/blogs/${id}`,BlogData );
    return (res.blog || res.data) as Blog
}


async function deleteBlog( id: string): Promise<void> {
    await api.delete(`/blogs/${id}` );
}

const BlogAPI = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}

export default BlogAPI;