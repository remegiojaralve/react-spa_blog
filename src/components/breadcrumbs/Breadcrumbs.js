import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'
import './breadcrumbs.scss';

function Breadcrumbs(props) {
  const [title, setTitle] = useState('')
  const { id } = useParams();
  const res = gql`
  query getPost {
    post(id: ${id}) {
      title
    }
  }
  `
  const { data } = useQuery(res);

  useEffect(() => {
    if (data) {
      setTitle(data.post.title)
    }
  }, [data]);

  return (
    <div className="breadcrumbs">
      <div className="l-container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item"><Link to="/">HOME</Link></li>
          <li className="breadcrumbs__item">{title ? title : "Create Post"}</li>
        </ul>
      </div>
    </div>
  )
}

export default Breadcrumbs;
