import React, { Component } from 'react';

import {CollectionWatchStatus} from '../../../types/IWatches';
import ToggleLikeButton from '../../ui-kit/ToggleLikeButton';
import ToggleWishButton from '../../ui-kit/ToggleWishButton';
import WatchStatus from '../../ui-kit/WatchStatus';
import Modal from '../Modal';
import PriceDescription from '../PriceDescription';

import './infoModal.scss';

interface IInfoModalProps {
  id?: number;
  title?: string;
  underTitle?: string;
  price?: number;
  description?: string;
  image?: string;
  status?: Maybe<CollectionWatchStatus>;
  inWish?: boolean;
  liked?: boolean;
  onClose: () => void;
  showCollectionValue?: boolean;
  disableButtons?: boolean;
  onAddToWishList?: (id: number) => void;
  onLikeClicked?: (id: number) => void;
  publicView?: boolean;
  renderBtns?: () => any;
}

export default class InfoModal extends Component<IInfoModalProps> {
  public onLikeClicked = () => {
    const { id, onLikeClicked } = this.props;
    id && onLikeClicked && onLikeClicked(id);
  };

  public onAddToWishList = () => {
    const { id, onAddToWishList } = this.props;
    id && onAddToWishList && onAddToWishList(id);
  };

  public render() {
    const {
      id,
      title,
      underTitle,
      price,
      description,
      image,
      disableButtons,
      publicView,
      status,
      inWish,
      liked,
      onAddToWishList,
      onLikeClicked,
      renderBtns,
    } = this.props;
    if (!id) {
      return null;
    }
    const isTogglesBtns = !disableButtons && !!onAddToWishList && !!onLikeClicked;
    return (
      <Modal
        onClose={this.props.onClose}
        isModalOpen={true}
        className={'standard-modal-wrapper'}
        classNameInside={'standard-modal standard-modal-public'}
      >
        <div className={'profile-watch-list-item profile-watch-list-item-public all-info-modal'}>
          <div className="left">
            <img className="img img-block" src={image}/>
          </div>

          <div className="right">
            <div className="name-rating-block">
              <div className="nameBrand">{title || ''}</div>
              <div className="nameModel">{underTitle || ''}</div>
            </div>
            <PriceDescription
              price={price || ''}
              descriptionTitle={'Description'}
              description={description || ''}
              className={'info-modal-price-description'}
            />
            {!publicView && status && (
              <div className={'btns'}>{<WatchStatus status={status}/>}</div>
            )}
            {isTogglesBtns && (
              <div className={'btns'}>
                <ToggleWishButton onClick={this.onAddToWishList} wish={inWish} />
                <ToggleLikeButton onClick={this.onLikeClicked} like={liked} />
              </div>
            )}
            {renderBtns && renderBtns()}
          </div>
        </div>
      </Modal>
    );
  }
}
