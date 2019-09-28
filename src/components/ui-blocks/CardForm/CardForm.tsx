import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import classNames from 'classnames';
import {Formik, FormikProps} from 'formik';
import Payment from 'payment';
import React, {Component} from 'react';

import {ReactComponent as CardAmexIcon} from '../../../resources/icons/card_amex.svg';
import {ReactComponent as CardMastercardIcon} from '../../../resources/icons/card_mastercard.svg';
import {ReactComponent as CardVisaIcon} from '../../../resources/icons/card_visa.svg';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from '../../../services/creditCard';
import {IError} from '../../../types/IBaseEntities';
import {ICardForm} from '../../../types/IMarket';
import CustomInput from '../../ui-kit/CustomInput';

import './cardForm.scss';
import ErrorHandler from "../ErrorHandler";


interface IOwnProps {
  selected: boolean;
  onSubmit?: (values: ICardForm) => void;
  className?: string;
  hideRadioBtn?: boolean;
  onClick?: () => void;
  showFormLoader: boolean;
  formErrors?: IError;
}

type CardFormProps = IOwnProps & FormikProps<ICardForm>;

class CardForm extends Component<CardFormProps> {
  public render() {
    const {
      values,
      errors,
      touched,
      selected,
      className,
      hideRadioBtn,
      handleChange,
      onClick,
    } = this.props;

    return (
      <form className={classNames('card-form', className)} autoComplete="off">
        <ErrorHandler {...this.props} />
        <Grid container item xs={12}>
          <Grid item xs={2} className="">
            {!hideRadioBtn && (
              <Radio
                checked={!!selected}
                className={classNames('custom-radio', {'custom-radio-active': !!selected})}
                onClick={onClick && onClick}
              />
            )}
          </Grid>
          <Grid container item xs={10} className={''}>
            <Grid item xs={7} className={'card-form-title'}>
              {'Credit card'}
            </Grid>
            <Grid item xs={5} className={'card-form-icons'}>
              <CardMastercardIcon/>
              <CardVisaIcon/>
              <CardAmexIcon/>
            </Grid>
            <Grid item xs={12} className={'card-form-text'}>
              {
                'Safe money transfer using your account. MasterCard, Visa, Maestro, Discover, American Express'
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <div className="credit-card-input-title">CARD NUMBER</div>
          <CustomInput
            id="card"
            autoComplete={'off'}
            type={'text'}
            placeholder={`0000 0000 0000 0000`}
            name="card"
            value={formatCreditCardNumber(values.card)}
            onChange={handleChange}
            formControlProps={{
              className: classNames('credit-card-input', {
                error: errors.card,
              }),
            }}
          />
        </Grid>
        <Grid container item xs={12} spacing={16} className="max-width-none">
          <Grid item xs={6} className={''}>
            <div className="credit-card-input-title">NAME ON CARD</div>
            <CustomInput
              id="cardholderName"
              autoComplete={'off'}
              type={'text'}
              placeholder={``}
              name="cardholderName"
              value={values.cardholderName}
              onChange={handleChange}
              formControlProps={{
                className: classNames('credit-card-input', {
                  error: errors.cardholderName,
                }),
              }}
            />
          </Grid>
          <Grid item xs={3} className={''}>
            <div className="credit-card-input-title">EXPIRE DATE</div>
            <CustomInput
              id="cardExpiry"
              autoComplete={'off'}
              type={'text'}
              placeholder={'MM/YY'}
              name="cardExpiry"
              value={formatExpirationDate(values.cardExpiry)}
              onChange={handleChange}
              formControlProps={{
                className: classNames('credit-card-input', {
                  // @ts-ignore
                  error: errors.cardExpiry || errors.exp_month || errors.exp_year,
                }),
              }}
            />
          </Grid>
          <Grid item xs={3} className={''}>
            <div className="credit-card-input-title">CVV CODE</div>
            <CustomInput
              id="cvc"
              autoComplete={'off'}
              type={'text'}
              placeholder={''}
              name="cvc"
              value={formatCVC(values.cvc)}
              onChange={handleChange}
              formControlProps={{
                className: classNames('credit-card-input', {
                  error: errors.cvc,
                }),
              }}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default React.forwardRef((props: IOwnProps, ref: any) => (
  <Formik
    ref={ref}
    initialValues={{
      card: '',
      cardholderName: '',
      cardExpiry: '',
      cvc: '',
    }}
    validate={(values: ICardForm) => {
      const card = values.card.trim();
      const cardExpire = values.cardExpiry.trim();
      const cvc = values.cvc.trim();
      const errors: Partial<ICardForm> = {};
      const isCardNumberValid = Payment.fns.validateCardNumber(card);
      if (!isCardNumberValid) {
        errors.card = 'Please enter correct Card Number.';
      }
      const month = cardExpire.substr(0, 2);
      const year = cardExpire.substr(3, 2);
      const isCardExpireValid = Payment.fns.validateCardExpiry(month, year);

      if (!isCardExpireValid) {
        errors.cardExpiry = 'Please enter correct Card Expire.';
      }
      const isCardCVCValid = Payment.fns.validateCardCVC(cvc);
      if (!isCardCVCValid) {
        errors.cvc = 'Please enter correct card CVC.';
      }
      return errors;
    }}
    onSubmit={(values: ICardForm) => {
      props.onSubmit && props.onSubmit(values);
    }}
    render={formikProps => <CardForm {...props} {...formikProps} />}
    validateOnChange={true}
    enableReinitialize={true}
  />
));
