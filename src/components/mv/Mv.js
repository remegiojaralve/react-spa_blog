import React, {useState, useEffect, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client'
import noImage from '../../assets/images/no-image.png';
import './mv.scss';

function MvSection() {
  const [ posts, setPosts ] = useState();
  let slideIndex = 1;

  const GET_POST = gql`
  query posts($offset: Int, $limit: Int) {
    posts(pagination : {offset: $offset, limit: $limit}) {
      id
      title
      content
      image
      createdAt
    }
  }
  `;

  const { data } = useQuery(
    GET_POST,
    {
      variables: {
        offset: 0,
        limit: 3
      },
      fetchPolicy: "cache-and-network"
    }
  );

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data])

  const showSlides = useCallback((n) => {
    let i;
    let slides = document.getElementsByClassName("js-mv-slides");
    let dots = document.getElementsByClassName("js-slider-dot");

    if(slides.length) {
      if (n > slides.length) {
        slideIndex = 1
      }
      if (n < 1) {
        slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" is-active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " is-active";
    }
  })

  useEffect(() => {
    showSlides(slideIndex);
  }, [showSlides, slideIndex]);

  //function plusSlides(n) {
  const plusSlides = (n) => {
    showSlides(slideIndex += n);
  }

  const currentSlide = (n) => {
    showSlides(slideIndex = n);
  }

  return (
    <section className="mv">
      <div className="mv__slider-container">

        { posts &&
          Object.keys(posts).map((value, index) => (
            <div className="mv__slides js-mv-slides" key={index}>
              <div className="mv__image" style={{ backgroundImage: `url(${posts[index].image ? posts[index].image : noImage})` }}></div>
              <div className="l-container">
                <div className="mv__slider-text-wrapper">
                  <h2 className="mv__slider-title">{posts[index].title}</h2>
                  <span className="mv__slider-time">{posts[index].createdAt ? posts[index].createdAt.split(' ')[0].replace(/-/g,'.') : ""}</span>
                </div>
              </div>
            </div>
          ))
        }

        <button className="mv__prev" onClick={(e) => plusSlides(-1)}></button>
        <button className="mv__next mv__next--next" onClick={(e) => plusSlides(1)}></button>
      </div>
      <br/>

      <div className="mv__dots-wrapper" style={{textAlign: 'center'}}>
        <span className="mv__slider-dot js-slider-dot" onClick={()=> currentSlide(1)}></span>
        <span className="mv__slider-dot js-slider-dot" onClick={()=> currentSlide(2)}></span>
        <span className="mv__slider-dot js-slider-dot" onClick={()=> currentSlide(3)}></span>
      </div>
    </section>
  );
}

export default MvSection;
