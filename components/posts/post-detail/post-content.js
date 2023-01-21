import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark"
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import classes from "./post-content.module.css";
import PostHeader from "./post-header";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

const PostContent = (props) => {

    const { post } = props;
    const imagePath = `/images/posts/${post.postId}/${post.image}`
    const customRenderers = {
        // img(image) {
        //     return <Image
        //         src={`/images/posts/${post.postId}/${image.src}`}
        //         alt={image.alt} width={600} height={300}
        //     />
        // },
        p(paragraph) {
            const { node } = paragraph;
            if (node.children[0].tagName === "img") {
                const image = node.children[0];
                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.postId}/${image.properties.src}`}
                            alt={image.properties.alt} width={600} height={300}
                        />
                    </div>
                );
            }
            return <p>{paragraph.children}</p>;
        },
        code(code) {
            const { className, children } = code;
            const language = className.split("-")[1];
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                >
                    {children}
                </SyntaxHighlighter>
            )
        }
    }

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRenderers}>
                {post.content}
            </ReactMarkdown>
        </article>
    );
}

export default PostContent;