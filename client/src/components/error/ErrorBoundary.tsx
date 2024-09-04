import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../ui/button';
import ErrorComponent from './ErrorComponent';
import { FaExclamationCircle } from '../../assets/icons';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error information
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({ error, errorInfo });
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorComponent
                    title='Something went wrong'
                    message="An unexpected error occurred."
                    buttonText='Try Again'
                    onButtonClick={this.handleReset}
                    icon={<FaExclamationCircle className="fa-5x text-8xl text-red-600" />}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
