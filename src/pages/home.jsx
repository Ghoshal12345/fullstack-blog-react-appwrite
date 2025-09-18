import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/index'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const { status, userData } = useSelector((state) => state.auth)
    useEffect(() => {
        if (status && userData) {
            appwriteService.getPosts()
                .then((result) => {
                    if (result && result.rows) {
                        setPosts(result.rows);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                });
        }
    }, [status, userData]);


    //  Not loggin in
    if (!status || !userData) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // logged in but no posts
    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                No posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    //  logged in and has posts
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
    )

}

export default Home
