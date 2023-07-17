import axios from "axios";
import React from "react";
import Category from "./category";
import { useEffect, useState } from "react";

const CategoriesTable = () => {
  const [categorylists, setCategoryList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories/all")
      .then((response) => {
        console.log(response.data);
        setCategoryList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
 return (
   <div className="col-md-12 col-lg-8">
     <table className="table">
       <thead>
         <tr>
           <th>
             <div className="form-check">
               <input className="form-check-input" type="checkbox" value="" />
             </div>
           </th>
           <th>ID</th>
           <th>Name</th>
           <th>Description</th>
           <th className="text-end">Action</th>
         </tr>
       </thead>
       {/* Table Data */}
       <tbody>{categorylists.map((category,index)=><Category list={category} index={index} key={category.id}></Category>)}</tbody>
     </table>
   </div>
 );
};

export default CategoriesTable;
