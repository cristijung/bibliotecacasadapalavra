import BlogLib from "../components/blogLib/BlogLib";
import postsData from "../data/blogposts.json";

export default function Blog() {
    return (
        <main>
            <BlogLib posts={postsData} />
        </main>
    );
}