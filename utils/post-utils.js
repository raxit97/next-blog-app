import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirPath = path.join(process.cwd(), "posts");

const getPostsFiles = () => {
    return fs.readdirSync(postDirPath);
};

const getAllPosts = () => {
    const postFiles = getPostsFiles();
    const allPosts = postFiles.map((postFile) => {
        return getPostData(postFile);
    });
    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
    return sortedPosts;
};

const getFeaturedPosts = () => {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter((post) => post.isFeatured);
    return featuredPosts;
};

const getPostData = (postIdentifier) => {
    const postId = postIdentifier.replace(/\.md$/, "");
    const filePath = path.join(postDirPath, `${postId}.md`);
    const postFileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(postFileContent);
    const postData = {
        ...data,
        postId,
        content
    };
    return postData;
};

export { getAllPosts, getFeaturedPosts, getPostData, getPostsFiles };
