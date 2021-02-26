import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'
import { useSelector } from 'react-redux';
import NewsArticle from '../news-article/NewsArticle';
import Button from '../button/Button';
import './news-archive.scss';
import noImage from '../../assets/images/no-image.png';

function NewsArchive() {
  const auth = useSelector(state => state.auth)
  const [ posts, setPosts ] = useState();
  const [ page, setPage ] = useState(6);

  const handleLoadMore = () => {
    setPage(page + page);
  }

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
        limit: page
      },
      fetchPolicy: "cache-and-network"
    }
  );


  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data])

  return (
    <section className="news-archive">
      <div className="l-container">

        <div className="new-archive__heading">
          <h2 className="news-archive__title">NEWS</h2>
          { auth &&
            <Link to="/news/new" className="news-archive__create-new-post">Create New Post</Link>
          }
        </div>

        <ul className="news-archive__list">
          { posts &&
            Object.keys(posts).map((value, index) => (
              <Link key={index} to={`/news/${posts[index].id}`}>
                <li className="news-archive__item">
                  <NewsArticle
                    title={ posts[index].title }
                    date={ posts[index].createdAt ? posts[index].createdAt.split(' ')[0].replace(/-/g,'.') : "" }
                    image={ posts[index].image ? posts[index].image : noImage }
                  />
                </li>
              </Link>
          ))
          }
        </ul>

        <div className="news-archive___button" onClick={handleLoadMore}>
          <Button text="LOAD MORE" type="button" />
        </div>
      </div>
    </section>
  );
}

export default NewsArchive;
