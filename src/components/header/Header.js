import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authLogOut } from '../../redux/modules/auth/authActions';
import { toggleForm } from '../../redux/modules/toggleForm/toggleFormActions';

import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './header.scss';


function Header(props) {
  const auth = useSelector(state => state.auth)
  const formIsActive = useSelector(state => state.toggleForm)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    dispatch(authLogOut());
    history.push('/');
  }

  const handleLoginFromInnerPage = () => {
    history.push('/');
    dispatch(toggleForm());
  }

  return (
    <div className="l-container">
      <header className="header">
        <h1 className="header__logo">
          <Link to="/"><Logo /></Link>
        </h1>

        {auth ? (
          <div className="header__button">
            <button onClick={handleLogOut} type="button">LOGOUT</button>
          </div>
        ):(
          props.isHome ? (
            <div className="header__button">
              {formIsActive ? (
                <button onClick={() => dispatch(toggleForm())} type="button">CLOSE</button>
              ):(
                <button onClick={() => dispatch(toggleForm())} type="button">LOGIN</button>
              )}
            </div>
          ): (
            <div className="header__button">
              <button onClick={handleLoginFromInnerPage} type="button">LOGIN</button>
            </div>
          )
        )}
      </header>
    </div>
  )
}

export default Header;
