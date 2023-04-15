/* *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright 2021 - Koninklijk Nederlands Meteorologisch Instituut (KNMI)
 * Copyright 2021 - Finnish Meteorological Institute (FMI)
 * */
import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// TODO: (Sander de Snaijer 2020-07-13) this error wrappper should get more (non-breaking?) logic when we have decided how to handle errors.
/**
 * ErrorBoundary
 * Wrap this component around parts of your application. It will catch any uncaught errors and display an alert, and allows you to continue using the rest of your application.
 *
 * @example
 * ``` <ErrorBoundary><ExampleComponent /></ErrorBoundary> ```
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static defaultProps = {
    onError: (): void => {},
  };

  private constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const { onError } = this.props;
    this.setState({ error, errorInfo });
    onError!(error, errorInfo);
  }

  public render(): React.ReactNode {
    const { error, errorInfo } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <div>
          <div
            title="Woops, an error has occurred. Please report the error shown below and reload the page if needed."
          >
            <div>
                <br />
                {error.toString()}
                <br />
                {errorInfo && errorInfo.componentStack}
                <br />
                <br />
                <Link
                  underline="always"
                  style={{ cursor: 'pointer' }}
                  onClick={(): void => window.location.reload()}
                >
                  Reload page
                </Link>
              </div>
            </div>
        </div>
      );
    }

    return children;
  }
}
export default ErrorBoundary;
