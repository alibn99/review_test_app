import React from 'react';

import { useRouter } from 'next/router';

// export async function getServerSideProps({ params }) {
//     try {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
//         const post = await response.json();
//
//         return {
//             props: { post }
//         };
//     } catch (error) {
//         console.error('Error fetching post:', error);
//         return {
//             props: {
//                 error: {
//                     message: 'Failed to fetch post. Please try again later.'
//                 }
//             }
//         };
//     }
// }

export async function getStaticPaths() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    const paths = posts.map(post => ({
        params: { id: `${post.id}` }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
        const post = await response.json();

        return {
            props: { post },
            revalidate: 600
        };
    } catch (error) {
        console.error('Error fetching post:', error);
        return {
            props: {
                error: {
                    message: 'Failed to fetch post. Please try again later.'
                }
            }
        };
    }
}
const Index = ({ post, error }) => {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
};

export default Index;