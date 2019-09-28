import { FormikProps, withFormik } from 'formik';
import React, {FunctionComponent} from 'react';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';

import { ROUTES } from '../../../constants';
import { trimValues } from '../../../services/utils';
import {MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH} from '../../../constants';
import { DEFAULT_SIGNIN_USER, ISignInUser, SocialAction } from '../../../types/IAuth';
import {IError} from '../../../types/IBaseEntities';
import {SocialType} from '../../../types/ISocial';
import {useHandleSubmit} from '../../hooks/useHandleSubmit';
import Socials from '../../ui-blocks/Socials';
import CustomInput from '../../ui-kit/CustomInput';

import './signIn.scss';

const SOCIALS = [
  {
    social: SocialType.GOOGLE,
  },
  {
    social: SocialType.FB,
  },
  {
    social: SocialType.IN,
  },
];

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Please enter correct your Email.')
    .required('Please enter your Email.'),
  password: yup
    .string()
    .trim()
    .required(
      `Please enter your Password (from ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH} symbols).`,
    )
    .min(MIN_PASSWORD_LENGTH, `Min password length is ${MIN_PASSWORD_LENGTH}`)
    .max(MAX_PASSWORD_LENGTH, `Max password length is ${MAX_PASSWORD_LENGTH}`)
    .matches(
      /([A-Za-z]+[0-9]+[\w.-]*)|([0-9]+[A-Za-z]+[\w.-]*)/,
      'Some of symbol(s) have to be number(s) and letter(s)',
    ),
});

interface IOwnProps {
  onSubmit: (user: ISignInUser) => void;
  showFormLoader: boolean;
  formErrors?: IError;
}

type ISignInFormProps = IOwnProps & FormikProps<ISignInUser>;

const SignInForm: FunctionComponent<ISignInFormProps> = (props: ISignInFormProps) => {
  const {values, errors, touched, handleSubmit} = props;

  useHandleSubmit<ISignInUser>(props);

  return (
    <div className="signin-signup">
      <div className="orange-title">SIGN IN</div>
      <form acceptCharset="UTF-8" onSubmit={handleSubmit}>
        <CustomInput
          id="email"
          type="text"
          name="email"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          placeholder="EMAIL"
          autoComplete="email"
          onChange={props.handleChange}
          autoFocus={true}
        />
        <CustomInput
          id="password"
          type="password"
          value={values.password}
          error={errors.password}
          touched={touched.password}
          placeholder="PASSWORD"
          autoComplete="password"
          onChange={props.handleChange}
        />
        <Socials text={'or sign in with'} socials={SOCIALS} action={SocialAction.SIGNIN} />
        <div className="forgot-pass-text">
          <NavLink to={ROUTES.FORGOT_PASSWORD}>Forgot your password?</NavLink>
        </div>
        <div className="already-have-text def-font">
          DON’T HAVE AN ACCOUNT?{' '}
          <NavLink to={ROUTES.SIGNUP}>
            <span className="nowrap">SIGN UP</span>
          </NavLink>
        </div>

        <div className="btns-block">
          <button className="btn btn--bg-white" type="submit">
            SIGN IN
          </button>
        </div>
      </form>
    </div>
  );
};

export default withFormik<IOwnProps, ISignInUser>({
  mapPropsToValues() {
    return {
      ...DEFAULT_SIGNIN_USER,
    };
  },
  validationSchema: schema,
  validateOnChange: true,
  async handleSubmit(values: ISignInUser, { props }) {
    props.onSubmit(trimValues(values, Object.getOwnPropertyNames(DEFAULT_SIGNIN_USER)));
  },
})(SignInForm);
