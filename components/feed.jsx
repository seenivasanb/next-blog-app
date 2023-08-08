"use client";

import React, { useEffect, useState } from 'react'
import PromptCard from './prompt-card';

const PromptCardList = ({ posts, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {posts.length > 0 && posts.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};


const Feed = () => {

    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {

    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/prompt`);
            const data = await response.json();

            setPosts(data);
        };
        fetchPosts();
    }, [])

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for the tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer" />
            </form>

            <PromptCardList
                posts={posts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed