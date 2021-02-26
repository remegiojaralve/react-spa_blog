import React from 'react';
import Header from '../../components/header/Header';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import NewsEditDetailForm from '../../components/news/NewsEditDetailForm';
import Comment from '../../components/comment/Comment';

function EditPost() {
  return (
    <div>
      <Header />
      <Breadcrumbs/>
      <NewsEditDetailForm />
      <Comment />
    </div>
  )
}

export default EditPost;
