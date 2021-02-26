import React from 'react';
import Header from '../../../components/header/Header';
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs';
import NewsDetail from '../../../components/news/NewsDetail';
import Comment from '../../../components/comment/Comment';

function NewsDetailPage() {
  return (
    <div className="new-detail-page">
      <Header />
      <Breadcrumbs/>
      <NewsDetail />
      <Comment />
    </div>
  );
}

export default NewsDetailPage;
