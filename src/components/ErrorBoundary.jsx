import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-dvh flex justify-center items-center bg-slate-400 dark:bg-slate-800">
          <span className="text-xl font-semibold text-white">
            {this.props.errorMsg}
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
