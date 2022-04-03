import React, { useEffect, useState } from "react";
import { deletePosts, getPosts } from "../api/posts";
import { useSearch } from "../context/searchProvider";
import PostCard from "./PostCard";

let pageNo = 0;
const POST_LIMIT = 9;

const getPaginationCount = (length) => {
  const division = length / POST_LIMIT;
  if (division % 1 !== 0) {
    return Math.floor(division) + 1;
  }
  return division;
};

export default function Home() {
  const {searchResult} = useSearch(); 
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState([]);

  const paginationCount = getPaginationCount(totalCount);
  const paginationArr = new Array(paginationCount).fill(' ');

  const fetchPosts = async () => {
    const { error, posts, postCount } = await getPosts(pageNo, POST_LIMIT);

    if (error) return console.log(error);

    setPosts(posts);
    setTotalCount(postCount);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchMorePosts = (index) =>{
    pageNo = index;
    fetchPosts();
  }
  const DeletePost = async ({id}) => {

   const confirmed = window.confirm('Are you sure!');
    if(!confirmed) return;

    const {error, message} = await deletePosts(id);
    if(error) return console.log(error, message);

    const newPosts = posts.filter(post => post.id !== id);
    setPosts(newPosts);
  } 

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 pb-5">
        {searchResult.length  ? searchResult.map((post)=>{
          return (
            <div>
            <PostCard key={post.id} posts={post} DeletePost={()=>DeletePost(post)} />
          </div>
          )
        }) : posts.map((post) => {
          return (
            <div>
              <PostCard key={post.id} posts={post} DeletePost={()=>DeletePost(post)} />
            </div>
          );
        })
        }
      </div>

     {paginationArr.length > 1 && !searchResult.length ? (
     <div className="py-2 flex justify-center items-center space-x-3">
      {paginationArr.map((_, index) => {
        return <button
          onClick={()=>fetchMorePosts(index)}
          key={index}
          className={
            index === pageNo ? 
            "text-blue-500 border-b-2 border-b-blue-500"
            : "text-gray-500"
          }
          > 
            {index + 1}
          </button>
        ;
      })}
      </div>):
      null
      }

    </div>
  );
}
