import classNames from 'classnames';
import React, { Component } from 'react';

import './modal.scss';

export enum ModalStyleType {
  WHITE_LG = 'WHITE_LG',
  BLACK_LG = 'BLACK_LG', // default
}

interface IOwnProps {
  onClose?: () => void;
  isModalOpen?: boolean;
  isHideCross?: boolean;
  className?: string;
  classNameInside?: string;
  styleType?: ModalStyleType;
}

type ModalBodyProps = IOwnProps;

export default class ModalBody extends Component<ModalBodyProps> {
  render() {
    const {onClose, classNameInside, isModalOpen, className, styleType} = this.props;
    return (
      <div
        className={`modal-block-container ${isModalOpen ? 'show' : ''} ${
          className ? className : ''
          }`}
      >
        <div
          className={classNames(
            `modal-block ${classNameInside || ''}`,
            {'modal-white-bg': styleType === ModalStyleType.WHITE_LG},
          )}
        >
          {this.props.children}
          {!this.props.isHideCross && (
            <div
              className={classNames('modal-close-icon', {
                'modal-white-bg': styleType === ModalStyleType.WHITE_LG,
              })}
              onClick={onClose && onClose}
            />
          )}
        </div>
        <div
          className={classNames('modal-bg', {
            'modal-white-bg': styleType === ModalStyleType.WHITE_LG,
          })}
          onClick={onClose && onClose}
        />
      </div>
    );
  }
}
