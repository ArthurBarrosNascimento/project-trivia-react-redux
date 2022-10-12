import React, { Component } from 'react';

class Timer extends Component {
  state = {
    time: 30, // time to answer the question
  };

  // React.useEffect(() => {
  //   const timer =
  //     counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
  //   return () => clearInterval(timer);
  // }, [counter]);

  handleCountDown = () => { // function that makes the regressive countdown.
    const {
      time, // time to answer the question
    } = this.state;

    const timer = time > 0 && setTimeout(() => { // function that makes the regressive countdown.
      console.log('counting');
      this.setState(
        (prevState) => ({
          time: prevState.time - 1, // whe set a STATE call time to manipulate the countdown.
        }),
      );
    }, 1000);
    return () => clearInterval(timer);
  };

  render() {
    const {
      time,
    } = this.state;

    this.handleCountDown();

    return (
      <div className="App">
        <div>
          Countdown:
          {time}
        </div>
      </div>
    );
  }
}

export default Timer;
