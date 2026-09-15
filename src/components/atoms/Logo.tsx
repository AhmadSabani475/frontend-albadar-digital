
interface PropTypes {
    src: string;
    alt?: string
}
const Logo = (props: PropTypes) => {
    const { src, alt } = props;
    return (
        <img src={src} alt={alt}
            className="h-10 w-10  dark:mix-blend-screen" />
    );
};

export default Logo;