import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client'
import './news-detail.scss';

function NewsDetailForm() {
  const history = useHistory();
  const [ image, setImage ] = useState("")
  const [changesTracker, setChangesTracker] = useState(0);
  const [values, setValues] = useState({
    title: "",
    image: "",
    content: "",
  });

  const ADD_POST = gql`
  mutation addPost($title: String!, $image: String, $content: String) {
    addPost(post : {title: $title, image: $image, content: $content}) {
      id
      title
    }
  }
  `
  const [addPost] = useMutation (ADD_POST, {
    update(_, result) {
      console.log(result.data.addPost.id);
      //setPostId(result.data.addPost.id)
      history.push(`/news/${result.data.addPost.id}`);
    },
    onError(err) {
      console.log(err)
    }
  })

  const handleChange = (event) => {
    event.preventDefault();
    setChangesTracker (changesTracker + 1);
    setValues({...values, [event.target.name]: event.target.value});

    if(event.target.name === "image") {
      let files = event.target.files;
      let filesArr = Array.prototype.slice.call(files);
      filesArr.forEach(function(f) {
        if (!f.type.match("image.*")) return;
        let reader = new FileReader();
        reader.onload = function(event) {
          let base64 = event.target.result;
          setImage(base64);
          setValues({...values, "image": base64});
        };
        reader.readAsDataURL(f);
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addPost({variables : values});
  }

  const handleDiscard = (e) => {
    e.preventDefault();
    if(changesTracker > 0) {
      let confirm = window.confirm("Discard changes?");
      if(!confirm) return;
      history.push('/');
    }else {
      history.push('/');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="l-container">
        <div className="news-detail">
          <button className="admin-link admin-link--left">Save Post</button>
          <button className="admin-link" onClick={(e) => handleDiscard(e)}>Cancel</button>
          <div className="news-detail__date">
            <time data-time="">2019.06.19</time>
          </div>
          <textarea className="news-detail__title news-detail__title--textarea" name="title" onChange={ handleChange } required/>
          <div className="news-detail__upload">
            <div className="news-detail__image-wrapper">
              <div className="news-detail__image" style={{ backgroundImage: `url(${image})` }}></div>
            </div>
            <input className="news-detail__file-input" onChange={ handleChange } type="file" id="img" name="image" accept="image/*" />
          </div>
          <textarea className="news-detail__description news-detail__description--textarea" name="content" onChange={ handleChange }/>
        </div>
      </div>
    </form>
  );
}

export default NewsDetailForm;
