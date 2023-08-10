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
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleSearchChange = (e) => {
        e.preventDefault;
        setSearchText(e.target.value);
    }

    const fetchPosts = async () => {
        const response = await fetch(`/api/prompt`);
        const data = await response.json();
        setPosts(data);
    };

    const filterPosts = () => {
        console.log("searchText", searchText);
        const regex = new RegExp(searchText, "i");

        return posts.filter(post =>
            regex.test(post.creator.username) ||
            regex.test(post.tag) ||
            regex.test(post.prompt));
    }

    const handleTagClick = (tag) => {
        setSearchText(tag);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        const filteredResults = filterPosts();
        setFilteredPosts(filteredResults);
    }, [searchText]);


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

            {searchText
                ? (<PromptCardList
                    posts={filteredPosts}
                    handleTagClick={handleTagClick}
                />)
                : (<PromptCardList
                    posts={posts}
                    handleTagClick={handleTagClick}
                />)}
        </section>
    )
}

export default Feed