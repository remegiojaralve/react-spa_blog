import React from 'react';
import { ReactComponent as Logo } from '../../assets/svg/logo-footer.svg';

import ScrollToTop from '../scroll-to-top/ScrollToTop';
import './footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="l-container">
        <div className="footer__logo">
          <Logo />
        </div>
        <div className="footer__info">
          <p>
            サンプルテキストサンプル ルテキストサンプルテキスト<br />
            サンプルテキストサンプル ルテキスト
          </p>
        </div>
      </div>
      <div className="footer__copyright">
        <p><small>Copyright©2007-2019 Blog Inc.</small></p>
      </div>
      <ScrollToTop />
    </footer>
  );
}

export default Footer;
