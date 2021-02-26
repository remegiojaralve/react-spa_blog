import React, {useState} from 'react';
import { useMutation, gql } from '@apollo/client'

import { useDispatch } from 'react-redux';
import { authLogin } from '../../redux/modules/auth/authActions';
import { toggleFormType, toggleForm } from '../../redux/modules/toggleForm/toggleFormActions';

import Button from '../button/Button';
import './form.scss';

function LoginForm(props) {
  const dispatch =  useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [isErrorClass, setIsErrorClass] = useState("");
  const [isOpenClass, setIsOpenClass] = useState("");

  const LOGIN_USER = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password)
  }
  `;

  const [ loginUser ] = useMutation(LOGIN_USER, {
    update(_, result) {
      if(result.data.authenticate){
        localStorage.setItem('token', result.data.authenticate);
        dispatch(authLogin(true));
        dispatch(toggleForm());
      }else {
        setIsErrorClass("is-error");
        setTimeout(() => {
          setIsOpenClass("is-open");
        }, 100)
      }
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser({variables: values});
  }

  const onChange = (event) => {
    event.preventDefault();
    setValues({...values, [event.target.name]: event.target.value});

    setIsOpenClass("");
    setTimeout(() => {
      setIsErrorClass("");
    }, 0)
  }

  return (
    <div className={`form ${isErrorClass} ${props.stateClass}`}>
      <h2 className="form__title">LOGIN</h2>
      <div className={`form__error-message ${isOpenClass}`}>The email and password you've entered doesn't match any account.</div>

      <form onSubmit={onSubmit}>
        <div className="form__input-container">
          <label className="form__label">Email</label>
          <input className="form__input" name="email" type="email" onChange={onChange} required/>
        </div>

        <div className="form__input-container">
          <label className="form__label">Password</label>
          <input className="form__input" name="password" type="password" onChange={onChange} required/>
        </div>

        <div className="form__button-wrapper">
          <Button text="LOGIN"/>
        </div>
      </form>

      <div className="form__note">
        No account yet?
        <button onClick={() => dispatch(toggleFormType('register-form'))} type="button"> REGISTER HERE</button>
      </div>
    </div>
  );
}

export default LoginForm;
