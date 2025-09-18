import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components/index';
import appwriteService from '../appwrite/config';

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts()
            .then((result) => {
                if (result && result.rows) {
                    // console.log("👉 Rows from result:", result.rows);   // only rows
                    setPosts(result.rows);
                    // console.log(posts); this is wrong cuz setPosts is asynchronous 
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    useEffect(()=>{
        if(posts.length>0){
            console.log(posts);
        }
    },[posts])
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">No posts found.</p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;

