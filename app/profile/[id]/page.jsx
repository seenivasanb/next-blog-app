"use client";

import Profile from "@components/profile";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyProfile = () => {

    const router = useRouter();
    const params = useParams()
    const { data: session } = useSession();
    const userId = params?.id;
    const searchParams = useSearchParams();
    const isOwner = (userId === session?.user.id) ? true : false;
    const userName = isOwner ? "My" : searchParams.get("name");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/users/${userId}/posts`);
                const data = await response.json();

                setPosts(data);
            } catch (error) {
                setPosts([]);
            }
        }
        if (userId) fetchPosts();

    }, [userId])


    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure, you want to delete the prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
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
            name={userName}
            data={posts}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isOwner={isOwner}
        />
    )
}

export default MyProfile;