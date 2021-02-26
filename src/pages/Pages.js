import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NewsDetailPage from './single/news-detail/NewsDetailPage';
import CreatePost from './create-post/CreatePost';
import EditPost from './edit-post/EditPost';
import Home from './home/Home';

function Pages(props) {
  const auth = useSelector(state => state.auth)

  return (
    <Switch>

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/news/new">
        { !auth && <Redirect to="/" /> }
        <CreatePost/>
      </Route>

      <Route path="/news/:id/edit">
        { !auth && <Redirect to="/" /> }
        <EditPost />
      </Route>

      <Route path="/news/:id">
        <NewsDetailPage />
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>

    </Switch>
  )
}

export default Pages;
