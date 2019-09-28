import classNames from 'classnames';
import React, { Component } from 'react';

interface ButtonOutlinedProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export default class ButtonOutlined extends Component<ButtonOutlinedProps> {
  render() {
    const { onClick, text } = this.props;
    return text ? (
      <div
        onClick={onClick && onClick}
        className={classNames('btn btn--yellow btn--with-arrow', this.props.className)}
      >
        {text}
      </div>
    ) : null;
  }
}
