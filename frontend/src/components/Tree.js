import React, { useState } from "react";

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
  const [childVisible, setChildVisibility] = useState(false);
  const hasChild = node.nodes ? true : false;
  const [status, setStatus] = useState("");
  const clickHandler = (category) =>{
    setChildVisibility((v) => !v);
    setStatus(category);
  }

  return (

    <div className="row flex-start">
      <li onClick={()=>clickHandler(node.category)} className="p-1">
        <p>{node.category}</p>
      </li>
      {hasChild && childVisible && <Tree data={node.nodes} />}
    </div>


  );
};

export default Tree;
