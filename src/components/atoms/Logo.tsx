import { cn } from '@/lib/utils';

interface PropTypes {
    src: string;
    alt?: string;
    className?: string;
}

const Logo = (props: PropTypes) => {
    const { src, alt, className } = props;
    return (
        <img
            src={src}
            alt={alt}
            className={cn('h-10 w-10 dark:mix-blend-screen', className)}
        />
    );
};

export default Logo;