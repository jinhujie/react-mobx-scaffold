import React from 'react';

class BackgroundedDropdown extends React.Component{
  state = {
    value: undefined,
    isOptionsShown: false,
  }
  onOptionClick = options => {
    this.setState({ value: options.id, isOptionsShown: false });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(options.source);
    }
  }
  openOptions = () => this.setState({ isOptionsShown: true })
  render = () => {
    //options: { key: `id`, text: `shown in select`, ojb: `onChange.returnType` }
    const { options, holder="" } = this.props;
    const { value, isOptionsShown } = this.state;
    const NonSelcted = typeof value === 'undefined';

    return <div className='bg-dropdown'>
      <div onClick={this.openOptions} >
        { NonSelcted 
          ? holder
          : options.find(v => v.id === value)}
      </div>
      { isOptionsShown
          ? options.map(v => 
            <div onClick={this.onOptionClick.bind(null, v)}>{v.text}</div>)
          : null
      }
    </div>
  }
}

export { BackgroundedDropdown };
