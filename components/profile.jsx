import React from 'react'
import PromptCard from './prompt-card'

const Profile = ({ name, data, desc, handleEdit, handleDelete, isOwner }) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {name} Profile
                </span>
            </h1>
            <p className="desc text-left">{desc}</p>

            <div className='mt-16 prompt_layout'>
                {data.length > 0 && data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                        isOwner={isOwner}
                    />
                ))}
            </div>

        </section>
    )
}

export default Profile