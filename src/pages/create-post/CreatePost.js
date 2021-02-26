import React from 'react';
import Header from '../../components/header/Header';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import NewsCreateForm from '../../components/news/NewsCreateForm';

function CreateNewsPostForm() {
  return (
    <div>
      <Header />
      <Breadcrumbs title="Create New Post"/>
      <NewsCreateForm />
    </div>
  )
}

export default CreateNewsPostForm;
