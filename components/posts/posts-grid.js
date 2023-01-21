import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

const PostsGrid = (props) => {

    const { posts } = props;

    return (
        <ul className={classes.grid}>
            {
                posts.map((post, index) => (
                    <PostItem post={post} key={index} />
                ))
            }
        </ul>
    );
}

export default PostsGrid;
