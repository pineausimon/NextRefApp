import { Button } from '../Button/button.component';
import './form-container.styles.css';

type FormContainerProps = {
    title?: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    mainButtonLabel: string;
    onSecondaryClick?: () => void;
    secondaryButtonLabel?: string;
};

export default function FormContainer({
    children,
    onSubmit,
    mainButtonLabel,
    onSecondaryClick,
    secondaryButtonLabel,
}: FormContainerProps) {
    return (
        <>
            <form className="form-card-body" onSubmit={onSubmit}>
                {children}
                <Button type="submit">{mainButtonLabel}</Button>
                {secondaryButtonLabel && onSecondaryClick && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onSecondaryClick}
                    >
                        {secondaryButtonLabel}
                    </Button>
                )}
            </form>
        </>
    );
}