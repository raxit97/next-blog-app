import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";

const MainNavigation = () => {

    const navigationLinks = [
        { href: "/posts", label: "Posts" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header className={classes.header}>
            <Link href="/">
                <Logo />
            </Link>
            <nav>
                <ul>
                    {
                        navigationLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href}>{label}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
