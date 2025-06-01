import React from 'react';
import FormContainer from '../../../shared/components/FormContainer/form-container.component';

type AuthFormProps = {
    title: string;
    fields: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    mainButtonLabel: string;
    secondaryButtonLabel: string;
    onSecondaryClick: (e: React.FormEvent) => void;
};

export default function AuthForm({
    title,
    fields,
    onSubmit,
    mainButtonLabel,
    secondaryButtonLabel,
    onSecondaryClick,
}: AuthFormProps) {
    return (
        <FormContainer
            title={title}
            onSubmit={onSubmit}
            mainButtonLabel={mainButtonLabel}
            secondaryButtonLabel={secondaryButtonLabel}
            onSecondaryClick={onSecondaryClick}>
            {fields}
        </FormContainer>
    );
}
