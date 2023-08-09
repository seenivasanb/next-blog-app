import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => {
            setCopied("");
        }, 3000)
    }

    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        alt="user image"
                        height={40}
                        width={40}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-santoshi font-semibold text-gray-900">
                            {post.creator.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                    </div>

                    <div
                        className="copy_btn"
                        onClick={handleCopy}>
                        <Image
                            alt="icons"
                            src={copied === post.prompt
                                ? "/icons/tick.svg"
                                : "/icons/copy.svg"}
                            width={12}
                            height={12}
                        />
                    </div>
                </div>
            </div>

            <p className="my-4 font-santoshi text-sm text-gray-700">
                {post.prompt}
            </p>

            <p className="font-inter text-sm blue_gradient cursor-pointer"
                onClick={() => handleTagClick && handleTagClick(post.tag)}>
                #{post.tag}
            </p>

            {session?.user.id === post.creator._id && pathName === "/profile" && (
                <div className='mt-5 flex-center gap-4 border-t border-gray-200 pt-3'>
                    <p className="font-inter green_gradient text-sm cursor-pointer"
                        onClick={handleEdit}>
                        Edit
                    </p>
                    <p className="font-inter orange_gradient text-sm cursor-pointer"
                        onClick={handleDelete}>
                        Delete
                    </p>
                </div>
            )}

        </div>
    )
}

export default PromptCard