import React, {useState} from 'react';
import './scroll-to-top.scss';

function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 1000){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 1000){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <div className="scroll-to-top__wrapper" style={{height: 70, display: showScroll ? 'flex' : 'none'}}>
      <div className="scroll-to-top" onClick={scrollTop}>TOP</div>
    </div>
  )
}

export default ScrollToTop;
