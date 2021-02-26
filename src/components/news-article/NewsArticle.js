import React from 'react';
import './news-article.scss';
//import dummyArticleImage from '../../assets/images/dummy-news-article-image.jpg';

function NewsArticle(props) {
  return (
    <article className="news-article">
      <div className="news-article__image-wrapper">
        <div className="news-article__image" style={{ backgroundImage: `url(${props.image})` }}></div>
      </div>
      <time className="news-article__date" date-time="">{props.date}</time>
      {/* <h3 className="news-article__title">サンプルテキストサンプル ル テキストサンプルテキストサンプルテキストサンプル ルテキ</h3> */}
      <h3 className="news-article__title"> { props.title} </h3>
    </article>
  )
}

export default NewsArticle;
