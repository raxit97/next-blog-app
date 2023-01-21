import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../utils/post-utils";

export default function AllPostsPage({ posts }) {

  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all programming posts and tutorials!" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
};

export function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts
    },
    revalidate: 1800
  }
}
