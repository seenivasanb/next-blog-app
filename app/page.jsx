import Feed from "@components/feed"

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center mb-10">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center">
                    AI-Powered Prompts
                </span>
            </h1>

            <Feed />
        </section>
    )
}

export default Home