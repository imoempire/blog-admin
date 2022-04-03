import React, { useState } from "react";
import {
  ImSpinner11,
  ImEye,
  ImFilePicture,
  ImFilesEmpty,
  ImSpinner
} from "react-icons/im";
import { uploadImage } from "../api/posts";
import { useNotification } from "../context/NotificationProvider";

const mdRules = [
  { titl: "From h1 to h6", rule: "# Heading -> ###Heading" },
  { titl: "Blockquote", rule: "> Your Qoute" },
  { titl: "Image", rule: "[image alt](http://image_url.com)" },
  { titl: "Link", rule: "[link Text](http://your_link.com)" },
];

const defaultPost = {
  title: "",
  thumbnail: "",
  featured: false,
  content: "",
  tags: "",
  meta: "",
  // slug
};

export default function CreatePost() {
  const [post, setPost] = useState(defaultPost);
  const [selectedThumbnailURL, setSelectedThumbnailURL] = useState("");  
  const [imageUrlToCopy, setImageUrlToCopy] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  const {updateNotification} = useNotification()

  const handleChange = ({ target }) => {
    const { name, value, checked } = target;

    if (name === "thumbnail") {
      const file = target.files[0];
      if (!file.type?.includes("image")) {
        return alert("Please select an image file");
      }
      setPost({ ...post, thumbnail: value });
      // setSelectedThumbnailURL
      return setSelectedThumbnailURL(URL.createObjectURL(file));
    }
    if (name === "featured") {
      localStorage.setItem('post', JSON.stringify({...post, featured: checked}));
      return setPost({ ...post, [name]: checked });
    }
    if (name === "tags") {
      const newTags = tags.split(", ");
      if (newTags.length > 4) updateNotification("warning","You can only select 4 tags");
    }
    if (name === "meta" && meta.length >= 150) {
      return setPost({ ...post, meta: value.substring(0, 149) });
    }
    
    const newPost={ ...post, [name]: value }

    setPost({...newPost});
    localStorage.setItem('post', JSON.stringify(newPost))
  };

  const handleImageUpload = async ({ target }) => {
    
    if(imageUploading) return;

    const file = target.files[0];
    if (!file.type?.includes("image")) {
      return updateNotification("error","Please select an image file");
    }

    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const { error, image } = await uploadImage(formData);
    setImageUploading(false);
    if (error) return console.log(error);
    setImageUrlToCopy(image);
  };

  const handleCopy = () => {
    const textToCopy = `![Add image description Here](${imageUrlToCopy})`;
    navigator.clipboard.writeText(textToCopy);

  }

  const { title, content, featured, tags, meta } = post;
  return (
    <form className="p-2 flex w-100">
      <div className="w-9/12 h-screen space-y-3 p-2 flex flex-col">
        {/* title and subtitle */}
        <div className="flex items-center justify-between space-x-5">
          <h1 className="text-xl font-semibold text-gray-700">Create a Post</h1>
          <div className="flex items-center space-x-5">
            <button type="button"
              className="flex items-center space-x-2 px-3 ring-1 ring-red-500 rounded h-10 text-red-500
          hover:text-white hover:bg-red-500 transition"
            >
              <ImSpinner11 />
              <span>Reset</span>
            </button>
            <button type="button"
              className="flex items-center space-x-2 px-3 ring-1 ring-blue-500 rounded h-10 text-blue-500
            hover:text-white hover:bg-blue-500 transition"
            >
              <ImEye />
              <span>View</span>
            </button>
            <button
              className="w-40 items-center bg-green-500 space-x-2 px-3 ring-1 ring-green-500 rounded h-10 text-white
            hover:text-green-500 hover:bg-transparent transition"
            >
              Post/Done
            </button>
          </div>
        </div>
        {/* featured label */}
        <div className="flex">
          <input
            name="featured"
            onChange={handleChange}
            id="featured"
            type="checkbox"
            hidden
          />
          <label
            className=" select-none flex items-center space-x-2 text-red-700 cursor-pointer group"
            htmlFor="featured"
          >
            <div className="w-4 h-4 rounded-full border-2 border-red-700 flex items-center justify-center group-hover:text-blue-500">
              {featured && (
                <div className="w-2 h-2 bg-red-700 rounded-full group-hover:text-blue-500" />
              )}
            </div>
            <span className="group-hover:text-blue-500">Featured</span>
          </label>
        </div>

        {/* title */}
        <input
          value={title}
          name="title"
          onChange={handleChange}
          type="text"
          className="text-xl outline-none focus:ring-1 rounded p-2 w-full font-semibold"
          placeholder="Post title"
        />
        {/* Image */}
        <div className="flex space-x-2">
          <div>
            <input
              onChange={handleImageUpload}
              id="image-input"
              type="file"
              hidden
            />
            <label
            htmlFor="image-input"
              className="flex items-center space-x-2 px-3 ring-1 ring-green-500 rounded h-14 text-green-700
            hover:text-white hover:bg-green-500 transition cursor-pointer"
            >
              <span>Place an Image</span>
             { !imageUploading ? <ImFilePicture /> : <ImSpinner className="animate-spin" /> }
            </label>
          </div>

          {imageUrlToCopy && (
            <div className="flex-1 justify-between flex bg-gray-400 rounded overflow-hidden">
              <input
                type="text"
                value={imageUrlToCopy}
                className="bg-transparent px-2 text-white w-full"
                disabled
              />
              <button onClick={handleCopy} type="button" className="text-xs flex flex-col items-center justify-center p-1 self-strench bg-gray-700 text-white">
                <ImFilesEmpty />
                <span>copy</span>
              </button>
            </div>
          )}
        </div>

        <textarea
          value={content}
          onChange={handleChange}
          name="content"
          className="resize-none outline-none focus:ring-1 rounded p-2 w-full font-mono tracking-wide text-lg"
          placeholder="## Markdown"
          rows="20"
        ></textarea>

        {/* tags */}
        <div>
          <label className="text-xl font-semibold text-gray-500" htmlFor="tags">
            Tags
          </label>
          <input
            value={tags}
            name="tags"
            onChange={handleChange}
            id="tags"
            type="text"
            className="text-xl outline-none focus:ring-1 rounded p-2 w-full"
            placeholder="Tags"
          />
        </div>

        {/* meta */}
        <div>
          <label className="text-xl font-semibold text-gray-500" htmlFor="meta">
            Meta Description {meta.length}/150
          </label>
          <textarea
            value={meta}
            onChange={handleChange}
            name="meta"
            id="meta"
            className="resize-none outline-none focus:ring-1 rounded p-2 w-full font-semibold "
            placeholder="meta description"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div className="w-1/4 px-3 py-5 bg-zinc-900 rounded relative">
        <h1 className="text-xl font-semibold text-white mb-2">Thumbnail</h1>
        {/* Thumbnail */}
        <div>
          <input
            onChange={handleChange}
            name="thumbnail"
            id="thumbnail"
            type="file"
            hidden
          />
          <label className="cursor-pointer" htmlFor="thumbnail">
            {selectedThumbnailURL ? (
              <img
                src={selectedThumbnailURL}
                className="aspect-video shadow-sm rounded"
                alt="thumbnail"
              />
            ) : (
              <div className="border text-white border-dashed border-white-500 aspect-video flex flex-col justify-center items-center">
                Thumbnail
                <span className="text-xs">Select thumbnail</span>
                <span className="text-xs">recommend size</span>
                <span>1280 * 720</span>
              </div>
            )}
          </label>
        </div>
        {/* Markdown rules */}
        <div>
          <div className="bg-white absolute top-1/3 translate-y-1/1 pz-1 py-1 rounded">
            <h1 className="font-semibold text-center">
              General markdown rules
            </h1>
            <ul className="space-y-2">
              {mdRules.map(({ title, rule }) => {
                return (
                  <li key={title}>
                    <p className="font-semibold text-gray-500">{title}</p>
                    <p className="font-semibold text-gray-700 pl-2 font-mono">
                      {rule}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
