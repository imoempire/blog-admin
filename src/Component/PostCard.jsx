import dateFormat from "dateformat";
import React from "react";
import {BsPencilSquare, BsTrash} from 'react-icons/bs'
import { Link } from "react-router-dom";

export default function PostCard({ posts, DeletePost }) {
  if (!posts) return null;
  const { title, thumbnail, tags, meta, createdAt, slug } = posts;
  return (
    <div className="bg-white shadow-sm rounded flex flex-col">
      
      <img className="aspect-video" src={thumbnail || "./spacelog.png"} alt={title} />

      <div className="p-2 flex-1 flex flex-col justify-between">
        <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
        <p className="text-gray-500">{meta.substring(0, 80) + "..."}</p>
        
        <div className="flex justify-between py-2">
          <p className="text-gray-500 text-sm">
            {dateFormat(createdAt, "mediumDate")}{" "}
          </p>
          <p className="text-gray-500 text-sm"> {tags.join(", ")}</p>
        </div>

         <div className="flex space-x-3">
            <Link to={`/update-post/${slug}`} className="w-7 h-7 rounded-full bg-blue-400 hover:bg-red-600 flex justify-center items-center text-white">
               <BsPencilSquare/>
            </Link>
            <button onClick={DeletePost} className="w-7 h-7 rounded-full bg-red-400 hover:bg-blue-600 flex justify-center items-center text-white">
               <BsTrash/>
            </button>
         </div>

      </div>
    </div>
  );
}
