import React, { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Route, Routes } from "react-router-dom";
import CreatePost from "./Component/CreatePost";
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import NotFound from "./Component/NotFound";
import SearchForm from "./Component/SearchForm";
import Update from "./Component/Update";

export default function App() {
  const [close, setClose] = useState(false);
  const toggleButton = () => {
    setClose(!close);
  };
  const getNavWidth = () => (close ? "w-16" : "w-56");
  return (
    <div className="flex">
      {/* nav */}
      <div
        className={
          getNavWidth() + " min-h-screen transition-width border border-r "
        }
      >
        <div className="sticky top-0">
          <Navbar close={close} />
        </div>
      </div>

      {/* content */}
      <div className="flex-1 min-h-screen bg-gray-100">
        <div className="sticky top-0">
          <div className="flex item-center p-2 space-x-2">
            <button onClick={toggleButton}>
              {close ? (
                <AiOutlineMenuUnfold size={30} />
              ) : (
                <AiOutlineMenuFold size={30} />
              )}
            </button>
            <SearchForm />
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/update-post/:slug" element={<Update />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
