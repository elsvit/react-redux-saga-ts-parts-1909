import classNames from 'classnames';
import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import './priceDescription.scss';

export enum PriceDescriptionSize {
  SMALL,
  LARGE,
}

interface PriceDescriptionProps {
  price?: number | string;
  isHide?: boolean;
  description?: string;
  descriptionTitle?: string;
  className?: string;
  size?: PriceDescriptionSize;
}

export default class PriceDescription extends Component<PriceDescriptionProps> {
  public render() {
    const { isHide, price, descriptionTitle, description, size, className } = this.props;
    const sizeClass = size && size === PriceDescriptionSize.LARGE ? 'fs-18' : 'fs-14';
    return (
      <div className={classNames('price-description', sizeClass, className)}>
        {price ? (
          <div className={classNames({ 'hide-elem': isHide }, 'watch-item-price')}>
            <NumberFormat
              decimalScale={0}
              fixedDecimalScale
              value={Number(price)}
              displayType={'text'}
              thousandSeparator={true}
              isNumericString={true}
              prefix={'$'}
            />
            <div className="smallPrice">
              {price != null
                ? Number(price)
                    .toFixed(2)
                    .slice(-2)
                : ''}
            </div>
          </div>
        ) : null}
        {descriptionTitle && <div className={'description-title'}>{descriptionTitle}</div>}
        {description && (
          <div
            className={classNames('description', {
              'description-large': size === PriceDescriptionSize.LARGE,
            })}
          >
            {description}
          </div>
        )}
      </div>
    );
  }
}
