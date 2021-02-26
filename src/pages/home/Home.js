import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import LoginForm from '../../components/form/LoginForm';
import RegisterForm from '../../components/form/RegisterForm';
import Mv from '../../components/mv/Mv';
import NewsArchive from '../../components/news-archive/NewsArchive';
import Header from '../../components/header/Header';

import './home.scss'

function Home(props) {
  const auth = useSelector(state => state.auth)
  const formIsActive = useSelector(state => state.toggleForm)
  const formType = useSelector(state => state.toggleFormType)
  const [stateClass, setStateClass] = useState();

  if (formIsActive) {
    setTimeout(() => {
      setStateClass("is-active");
    }, 0)
  }else {
    setTimeout(() => {
      setStateClass("");
    }, 0)
  }

  return (
    <div>
      <Header isHome={true} />
      {!auth ? ( formIsActive ? ( formType === "login-form" ? ( <LoginForm stateClass={stateClass}/>) : ( <RegisterForm stateClass={stateClass} />)):( <Mv />)) : ( <Mv />)}
      <NewsArchive />
    </div>
  )
}

export default Home;
