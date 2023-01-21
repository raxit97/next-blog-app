import Image from "next/image";
import Link from "next/link";
import classes from "./post-item.module.css";

const PostItem = (props) => {

    const { image, title, date, description, postId } = props.post;
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    const imagePath = `/images/posts/${postId}/${image}`;

    return (
        <li className={classes.post}>
            <Link href={`/posts/${postId}`}>
                <div className={classes.image}>
                    <Image layout="responsive" src={imagePath} alt={title} width={300} height={200} />
                </div>
                <div className={classes.content}>
                    <h3>{title}</h3>
                    <time>{formattedDate}</time>
                    <p>{description}</p>
                </div>
            </Link>
        </li>
    );
}

export default PostItem;
