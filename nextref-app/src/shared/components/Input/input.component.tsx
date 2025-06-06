type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    className?: string;
};

export default function Input({ label, className = '', ...props }: InputProps) {
    return (
        <div className={`form-control w-full ${className}`}>
            {label && (
                <label htmlFor={props.id} className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <input className="input input-bordered w-full" {...props} />
        </div>
    );
}
