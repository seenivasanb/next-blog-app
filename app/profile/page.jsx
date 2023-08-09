"use client";

import Profile from "@components/profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {

    const router = useRouter();

    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/users/${session.user.id}/posts`);
                const data = await response.json();

                setPosts(data)
            } catch (error) {
                setPosts([]);
            }
        }
        if (session?.user.id) fetchPosts();

    }, [session?.user.id])


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure, you want to delete the prompt?");

        if (hasConfirmed) {
            try {
                const response = await fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE"
                });

                const filteredPosts = posts.filter(currentPost => currentPost._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name="My"
            data={posts}
            desc="Welcome to the profile page"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile