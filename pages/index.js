import Head from "next/head";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../utils/post-utils";

export default function HomePage({ featuredPosts }) {

  return (
    <>
      <Head>
        <title>Raxit&lsquo;s blogs</title>
        <meta name="description" content="I post about programming and web development" />
      </Head>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
};

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      featuredPosts
    },
    revalidate: 1800
  }
}
