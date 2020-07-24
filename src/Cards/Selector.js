import React from "react";
import "./Selector.css";

export default (props) => (
 <div className="selector-container">
     <div className={`search-optn ${props.selected === 'profile' ? 'selected' : ''}`}> <a href="/">Profile </a> </div>
     <div className={`search-optn ${props.selected === 'tag' ? 'selected' : ''}`}> <a href="/tag/a">Tag </a> </div>
 </div>

);
