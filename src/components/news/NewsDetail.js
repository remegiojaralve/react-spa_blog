import React, { useState , useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'
import { useSelector } from 'react-redux';
import noImage from '../../assets/images/no-image.png';
import './news-detail.scss';

function NewsDetails(props) {
  const auth = useSelector(state => state.auth);
  const [ post, setPost ] = useState();
  const { id } = useParams();

  const GET_POST = gql`
  query getPost {
    post(id: ${id}) {
      id
      title
      image
      content
      createdAt
      comments {
        content
        createdAt
      }
    }
  }
  `
  const { data } = useQuery(GET_POST);

  useEffect(()=>{
    if (data) {
      setPost(data.post);
    }
  }, [data])

  return (
    <div className="l-container">
      <div className="news-detail">
        {auth &&
        <Link className="admin-link" to={`/news/${id}/edit`}>Edit Post</Link>
        }
        <div className="news-detail__date">
          <time data-time="">{ post && post.createdAt !== null ? post.createdAt.split(' ')[0].replace(/-/g,'.') : "no-date" }</time>
        </div>
        <h2 className="news-detail__title">{ post && post.title  }</h2>

        <div className="news-detail__image-wrapper">
          <div className="news-detail__image" style={{ backgroundImage: `url(${post && post.image ? post.image : noImage})` }}></div>
        </div>

        <div className="news-detail__description">
          <p>
            {post && post.content}
          </p>
        </div>

        <div className="news-detail__hr"></div>
      </div>
    </div>
  );
}

export default NewsDetails;
