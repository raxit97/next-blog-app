import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../utils/post-utils";

export default function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.description} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
};

export function getStaticProps(context) {
  const postIdentifier = context.params.postId;
  const postData = getPostData(postIdentifier);
  return {
    props: {
      post: postData
    },
    revalidate: 600
  };
}

export function getStaticPaths() {
  const postFiles = getPostsFiles();
  const postIds = postFiles.map(fileName => fileName.replace(/\.md$/, ""));
  const paths = postIds.map(postId => ({ params: { postId } }));
  return {
    paths,
    fallback: false
  };
}
