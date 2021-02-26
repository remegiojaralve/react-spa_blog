import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client'
import Button from '../button/Button';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import './comment.scss';


function Comment() {
  const [content, setContent] = useState("");
  const [ comments, setComments ] = useState([]);
  const { id } = useParams()

  const GET_COMMENTS = gql`
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
  const { data } = useQuery(GET_COMMENTS);

  useEffect(() => {
    if (data) {
      setComments(Object.values(data.post.comments).reverse())
    }
  }, [data])

  const ADD_COMMENT = gql`
  mutation addComment($postId: Int!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      content
      createdAt
    }
  }
  `;

  const [addComment] = useMutation (ADD_COMMENT, {
    update(_, result) {
      setComments([...comments, result.data.addComment]);
      setContent("")
    },
    onError(err) {
      console.log(err)
    }
  })

  const handleSubmit = (event)=> {
    event.preventDefault();
    addComment({variables : { postId: parseInt(id), content: content } });
  }

  const handleChange = (event) => {
    event.preventDefault();
    setContent(event.target.value);
  }

  const newMoment = (date) => {
    return date.split(' ')[0] +" "+ date.split(' ')[1] +""+ date.split(' ')[2];
  }

  return (
    <div className="l-container">
      <div className="comment">
        <h2 className="comment__title">COMMENT</h2>

        {
          Object.keys(comments).map((value, index) => (
            <div className="comment__message" key={index}>
              <p>{comments[index].content}</p>
              <span className="comment__message-date">{moment(newMoment(comments[index].createdAt)).fromNow()}</span>
            </div>
          ))
        }

        <div className="comment__form">
          <form onSubmit={ handleSubmit }>
            <textarea className="comment__textarea" name="comment" value={content} placeholder="Write comment" onChange={handleChange} required/>
            <div className="comment__button">
              <Button text="SUBMIT" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comment;
