import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { selectCategory } from "../actions/addProductActions";

function Tree({ data = [] }) {
  return (
    <>
      <ul className="scroll-item">
        {data.map((item, index) => (
          <TreeNode node={item} key={index}/>
        ))}
      </ul>
    
    
    </>
  );
}


const TreeNode = ({ node }) => {
  const dispatch = useDispatch();
  const [childVisible, setChildVisibility] = useState(false);
  const hasChild = node.nodes ? true : false;

  const clickHandler = (category) =>{
    setChildVisibility((v) => !v);
    dispatch(selectCategory(category));
   
  }

  return (

    <div className="row flex-start align-start">
      <li onClick={()=>clickHandler(node.category)} className="p-1">
        <p>{node.category}</p>
      </li>
      {hasChild && childVisible && <Tree data={node.nodes} />}
    </div>


  );
};

export default Tree;
