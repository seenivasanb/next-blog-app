
'use client'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from "react";

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const handleProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        handleProviders();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link className="flex gap-2 flex-center" href="/">
                <Image
                    src="/images/logo.svg"
                    alt='Logo Image'
                    width={30}
                    height={30} />

                <p className="logo_text">Promptopia</p>
            </Link>

            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link className="black_btn" href="/create-post">
                            Create Post
                        </Link>

                        <button className="outline_btn" type="button" onClick={signOut}>
                            Sign Out
                        </button>

                        <Link href={`/profile/${session.user.id}`}>
                            <Image
                                src={session.user.image}
                                alt="Profile"
                                width="37"
                                height="37"
                                className="rounded-full object-contain"
                            />
                        </Link>
                    </div>

                ) : (
                    <>
                        {providers && Object.values(providers).map(provider => (
                            <button type="button" key={provider.name}
                                onClick={() => signIn(provider.id)} className="black_btn">
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav