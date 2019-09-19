import React from "react";
// import { Link } from "react-router-dom";
// import { Query } from "react-apollo";
// import Queries from "../../graphql/queries";
import {
  FaFrog,
  FaFish,
  FaHorse,
  FaSpider,
  FaKiwiBird,
  FaDragon
} from "react-icons/fa"; 
import { Link } from "react-router-dom";

const CategoryIndex = () => {
  return (
    <div className="categories-container">
      <h1 className="categories-header">Select a category that interests you!</h1>
      <h4 className="categories-subheader">Discover projects focused on the six major animal groups.</h4>
      <div className="categories-icons">
        <Link className="categories-campaign-link" to={`/campaigns/5d72bc8be995150bbd666670`}>
          < FaFrog id="categories-icons-item"/>
          <h5 className="categories-icons-item-text">AMPHIBIAN</h5>
        </Link>
        <Link className="categories-campaign-link" to={`/campaigns/5d72bc8ae995150bbd66666e`}>
          < FaFish id="categories-icons-item" />
          <h5 className="categories-icons-item-text">FISH</h5>
        </Link>
        <Link className="categories-campaign-link" to={`/campaigns/5d72bc8ae995150bbd66666c`}>
          < FaHorse id="categories-icons-item" />
          <h5 className="categories-icons-item-text">MAMMAL</h5>
        </Link>
        <Link className="categories-campaign-link" to={`/campaigns/5d7b415a08889c30fa59221e`}>
          < FaSpider id="categories-icons-item" />
          <h5 className="categories-icons-item-text">INVERTEBRATES</h5>
        </Link>
        <Link className="categories-campaign-link" to={`/campaigns/5d7b415a08889c30fa59221e`}>
          < FaKiwiBird id="categories-icons-item" />
          <h5 className="categories-icons-item-text">BIRD</h5>
        </Link>
        <Link className="categories-campaign-link" to={`/campaigns/5d72bc8be995150bbd666670`}>
          < FaDragon id="categories-icons-item" />
          <h5 className="categories-icons-item-text">REPTILE</h5>
        </Link>

      </div>
    </div>
  );
};

export default CategoryIndex;