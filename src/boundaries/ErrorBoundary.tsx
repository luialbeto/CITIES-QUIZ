import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: '48px 24px',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>🚨</h1>
          <h2 style={{ marginBottom: '16px', color: '#1f2937' }}>Oops! Something went wrong</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
          {this.state.error && (
            <details style={{ marginTop: '32px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#6b7280' }}>Error details</summary>
              <pre
                style={{
                  marginTop: '16px',
                  padding: '16px',
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '12px',
                  color: '#ef4444',
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}