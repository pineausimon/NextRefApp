import React from 'react';
import './form-container.styles.css';

type FormContainerProps = {
    title: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    mainButtonLabel: string;
    onSecondaryClick?: (e: React.FormEvent) => void;
    secondaryButtonLabel?: string;
};

export default function FormContainer({
    title,
    children,
    onSubmit,
    mainButtonLabel,
    onSecondaryClick,
    secondaryButtonLabel,
}: FormContainerProps) {
    return (
        <div className="form-container-bg">
            <form className="form-container" onSubmit={onSubmit}>
                <h1 className="form-container-title">{title}</h1>
                {children}
                <button className="form-container-main-btn" type="submit">
                    {mainButtonLabel}
                </button>
                {secondaryButtonLabel && onSecondaryClick && (
                    <button
                        type="button"
                        className="form-container-secondary-btn"
                        onClick={onSecondaryClick}>
                        {secondaryButtonLabel}
                    </button>
                )}
            </form>
        </div>
    );
}
