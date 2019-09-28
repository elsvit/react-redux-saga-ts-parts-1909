import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { Component } from 'react';

import Pagination from '../../ui-blocks/Pagination';
import './collectionList.scss';

interface CollectionListProps<T> {
  items: T[];
  perPage?: number;
  renderItem: (item: T) => any;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  changePage?: (page: number) => void;
  hidePagination?: boolean;
  className?: string;
  itemClassName?: string;
}

export default class CollectionList<T> extends Component<CollectionListProps<T>> {
  render() {
    const {
      items,
      perPage,
      currentPage,
      totalItems,
      renderItem,
      changePage,
      hidePagination,
      className,
      itemClassName,
    } = this.props;
    if (items == null || isEmpty(items) || renderItem == null) {
      return null;
    }
    const totalPages =
      this.props.totalPages || Math.ceil(perPage && totalItems ? totalItems / perPage : 0);
    return (
      <React.Fragment>
        <div className={classNames('collection-list', className)}>
          {items.map((item: T, idx: number) => {
            if (perPage && idx > perPage) {
              return null;
            } else {
              return (
                <div
                  key={idx}
                  className={classNames('collection-list-item-wrapper', itemClassName)}
                >
                  {this.props.renderItem(item)}
                </div>
              );
            }
          })}
        </div>
        {!hidePagination && currentPage != null && totalPages && changePage && (
          <Pagination currentPage={currentPage} totalPages={totalPages} changePage={changePage} />
        )}
      </React.Fragment>
    );
  }
}
