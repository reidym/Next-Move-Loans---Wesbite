import { Component, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean; error: Error | null }

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }

  render() {
    if (!this.state.hasError) return this.props.children;
    return <div className="grid min-h-screen place-items-center bg-[#F7F5F1] p-8 text-[#16203A]" role="alert">
      <div className="w-full max-w-xl border-t-4 border-[#EC7354] bg-white p-8 shadow-xl">
        <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-[#16203A] text-xl font-black text-white">!</span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.04em]">This page could not finish loading.</h1>
        <p className="mt-3 leading-7 text-[#4C5566]">No information was submitted. Reload the page, or call the team if the problem continues.</p>
        <button className="mt-7 min-h-11 bg-[#16203A] px-5 font-extrabold text-white" onClick={() => window.location.reload()} type="button">Reload page</button>
      </div>
    </div>;
  }
}

export default ErrorBoundary;

