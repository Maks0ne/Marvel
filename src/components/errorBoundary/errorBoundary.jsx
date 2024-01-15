import { Component } from "react";
import ErrorMEssage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true
    })
  }

  // static getDerivedStateFromError(error) {
  //   return { error: true }
  // }
  render() {
    if (this.state.error) {
      return <ErrorMEssage />
    }
    return this.props.children
  }
}

export default ErrorBoundary