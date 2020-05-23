import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../api";
import YaziYorumlari from "./YaziYorumlari";
import {Link} from "react-router-dom"
import SilModal from "./SilModal";

const YaziDetayi = props => {
  const { id } = props.match.params;
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [yorumlar, setYorumlar] = useState([]);

  const handleCommentSubmit = (event, yorum) => {
    event.preventDefault();
    api()
      .post(`/posts/${id}/comments`, yorum)
      .then(response => {
        setYorumlar([...yorumlar, response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
      .then(responses => {
        setYaziDetayi(responses[0].data);
        setYorumlar(responses[1].data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);
  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title} </h2>
      <p>{yaziDetayi.created_at}</p>
      <div className="ui buttons">
        <Link className="ui blue button" to={`/post/${yaziDetayi.id}/edit`}>Duzenle</Link>
        {/* <button className="ui red button">Sil</button> */}
        <SilModal yazi={yaziDetayi} push={props.history.push}/>
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
    </React.Fragment>
  );
};

export default YaziDetayi;
