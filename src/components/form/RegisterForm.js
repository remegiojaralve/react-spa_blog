import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client'

import { useDispatch } from 'react-redux';
import { authLogin } from '../../redux/modules/auth/authActions';
import { toggleFormType, toggleForm } from '../../redux/modules/toggleForm/toggleFormActions';

import Button from '../button/Button';
import './form.scss';

function RegisterForm(props) {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isErrorClass, setIsErrorClass] = useState("");
  const [isOpenClass, setIsOpenClass] = useState("");
  const [errorMessage, setErrorMessage] = useState("Invalid Password");

  const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
  `;

  const LOGIN_USER = gql`
  mutation authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password)
  }
  `;

  const [ loginUser ] = useMutation(LOGIN_USER, {
    update(_, result) {
      if(result.data.authenticate){
        localStorage.setItem('token', result.data.authenticate);
      }
    }
  });

  const [ registerAcct ] = useMutation(REGISTER, {
    update(_, result) {
      if(result.data.register){
        console.log(result.data)
        loginUser({variables: values});
        dispatch(authLogin(true));
        dispatch(toggleForm());
        dispatch(toggleFormType('login-form'));
      }
    },
    onError(err) {
      //alert(err.graphQLErrors[0].extensions.exception.errors[0].message)
      setErrorMessage("Email address is already been taken");
    }
  });

  const showErrorMessage = (errorMessage) => {
    setErrorMessage(errorMessage);
    setIsErrorClass("is-error");
    setTimeout(() => {
      setIsOpenClass("is-open");
    }, 100)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    showErrorMessage();
    const re = /\S+@\S+\.\S+/
    if(re.test(values.email)) {
      if (values.password === values.confirmPassword) {
        registerAcct({variables: values});
      }else {
        setErrorMessage("Your password and confirmation password do not match");
      }
    } else {
      setErrorMessage("Email address is invalid");
    }
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
    <section className={`form ${isErrorClass} ${props.stateClass}`}>
      <h2 className="form__title">REGISTER</h2>
      <div className={`form__error-message ${isOpenClass}`}>{ errorMessage }</div>
      <form onSubmit={onSubmit}>
        <div className="form__input-container form__input-container--register">
          <label className="form__label">Email</label>
          <input className="form__input" name="email" type="email" onChange={onChange} required/>
        </div>

        <div className="form__input-container form__input-container--register">
          <label className="form__label">Password</label>
          <input className="form__input" name="password" type="password" onChange={onChange} required/>
        </div>

        <div className="form__input-container form__input-container--register">
          <label className="form__label">Confirm Password</label>
          <input className="form__input" name="confirmPassword" type="password" onChange={onChange} required/>
        </div>

        <div className="form__button-wrapper">
          <Button text="REGISTER"/>
        </div>

        <div className="form__note">
          Already have an account?
          <button onClick={() => dispatch(toggleFormType('login-form'))} type="button"> LOGIN HERE</button>
        </div>
      </form>
    </section>
  );
}

export default RegisterForm;
