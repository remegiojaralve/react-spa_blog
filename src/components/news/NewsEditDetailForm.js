import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client'
import noImage from '../../assets/images/no-image.png';
import './news-detail.scss';

function NewsDetailForm() {
  const { id } = useParams();
  const history =  useHistory();
  const [ image, setImage ] = useState()
  const [changesTracker, setChangesTracker] = useState(0);
  const [ post, setPost ] = useState();

  const GET_POST = gql`
  query getPost {
    post(id: ${id}) {
      id
      title
      content
      createdAt
      image
    }
  }
  `
  const { data } = useQuery(GET_POST);

  useEffect(()=>{
    let isMounted = true;
    if (data && isMounted) {
      setPost(data.post);
      setImage(data.post.image)
    }
    return () => isMounted = false;
  }, [data])

  const UPDATE_POST = gql`
  mutation updatePost($id: Int!, $title: String!, $image: String, $content: String) {
    updatePost(post : {id: $id, title: $title, image: $image, content: $content}) {
      id
    }
  }
  `;

  const [updatePost] = useMutation(UPDATE_POST, {
    update(_, result) {
      history.push(`/news/${id}`);
    },
    onError(err) {
      console.log(err)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost({variables: post});
    history.push(`/news/${id}`);
    window.location.reload(false);
  }



  const handleChange = (event) => {
    event.preventDefault();
    setChangesTracker (changesTracker + 1);
    setPost({...post, [event.target.name]: event.target.value});

    if(event.target.name === "image") {
      let files = event.target.files;
      let filesArr = Array.prototype.slice.call(files);
      filesArr.forEach(function(f) {
        if (!f.type.match("image.*")) return;
        let reader = new FileReader();
        reader.onload = function(event) {
          let base64 = event.target.result;
          setImage(base64);
          setPost({...post, "image": base64});
        };
        reader.readAsDataURL(f);
      });

    }
  }

  const handleDiscardChanges = (e) => {
    e.preventDefault();
    if(changesTracker > 0) {
      let confirm = window.confirm("Discard Changes?");
      if(!confirm) return;
      history.push(`/news/${id}`);
    }else {
      history.push(`/news/${id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="l-container">
        <div className="news-detail">
          <button className="admin-link admin-link--left" type="submit">Save Post</button>
          <button className="admin-link" onClick={(e) => handleDiscardChanges(e)}>Cancel</button>
          <div className="news-detail__date">
            <time data-time="">2019.06.19</time>
          </div>

          <textarea className="news-detail__title news-detail__title--textarea" name="title" value={ post && post.title } onChange={handleChange}/>

          <div className="news-detail__upload">
            <div className="news-detail__image-wrapper">
              <div className="news-detail__image" style={{ backgroundImage: `url(${image && image ? image : noImage})` }}></div>
            </div>
            <input className="news-detail__file-input" onChange={ handleChange } type="file" id="img" name="image" accept="image/*" />
          </div>

          <textarea className="news-detail__description news-detail__description--textarea" name="content" value={ post && post.content ? post.content : "" } onChange={handleChange}/>

          <div className="news-detail__hr"></div>
        </div>
      </div>
    </form>
  );
}

export default NewsDetailForm;
