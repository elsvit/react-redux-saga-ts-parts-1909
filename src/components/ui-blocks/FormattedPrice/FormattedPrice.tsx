import classNames from 'classnames';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import './formattedPrice.scss';

interface FormattedPriceProps {
  price?: number | string;
  isHide?: boolean;
  className?: string;
  prefix?: string;
}

export default class FormattedPrice extends Component<FormattedPriceProps> {
  render() {
    const { isHide, price, prefix, className } = this.props;
    if (price == null) {
      return null;
    }
    return (
      <div className={classNames({ 'hide-elem': isHide }, 'formatted-price', className)}>
        <NumberFormat
          decimalScale={0}
          fixedDecimalScale
          value={Number(price)}
          displayType={'text'}
          thousandSeparator={true}
          isNumericString={true}
          prefix={prefix || '$'}
        />
        <div className="smallPrice">{Number(price).toFixed(2).slice(-2)}</div>
      </div>
    );
  }
}
