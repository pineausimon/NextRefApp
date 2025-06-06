type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
    type?: 'button' | 'submit' | 'reset';
    className?: string;
};

export function Button({ children, variant = 'primary', className = '', ...props }: Props) {
    const variantClass = `btn-${variant}`;
    return (
        <button className={`btn ${variantClass} ${className}`} {...props}>
            {children}
        </button>
    );
}
