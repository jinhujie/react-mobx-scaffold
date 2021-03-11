import React from 'react';

class BackgroundedDropdown extends React.Component{
  state = {
    value: undefined,
    isOptionsShown: false,
  }
  onOptionClick = value => {
    this.setState({ value, isOptionsShown: false });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value);
    }
  }
  openOptions = () => this.setState({ isOptionsShown: true })
  render = () => {
    const { options, holder } = this.props;
    const { value, isOptionsShown } = this.state;
    const NonSelcted = typeof value === 'undefined';

    return <div>
      <div onClick={this.openOptions}>
        { NonSelcted 
          ? holder
          : options.find(v => v === value)}
      </div>
      { isOptionsShown
          ? options.map(v => 
            <div onClick={this.onOptionClick.bind(null, v)}>{v}</div>)
          : null
      }
    </div>
  }
}

export { BackgroundedDropdown };
