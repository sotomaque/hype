import React from 'react';

import ErrorView from './ErrorView';

interface Props {
  children: JSX.Element;
}

interface State {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render(): JSX.Element {
    if (this.state.error) {
      return <ErrorView onReset={() => this.setState({ error: null })} />;
    }

    return this.props.children;
  }
}
