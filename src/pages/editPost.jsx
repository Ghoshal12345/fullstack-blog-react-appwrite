import React, { useEffect, useState } from 'react'
import { Container, Postform } from '../components/index'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config';


function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate('/');
            })
        }
        else {
            navigate('/');
        }
    }, [slug, navigate])
    return (
        <div className='py-8'>
            <Container>
                <Postform post={post}/>
            </Container>

        </div>
    )
}

export default EditPost
