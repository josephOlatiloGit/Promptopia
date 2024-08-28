"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

/**
 * We want to render the list of all the prompts in the feeds component. component.
 * we create a new api to get all the post
 *NOTE: the PromptCarList Component is only specific for the Feeds component
 */

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default function Feeds() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  console.log(posts);

  const handleSearchChange = (e) => {};

  // call the api to fetch all post at page load
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* We render the PromptCardList which is only for this component with required props */}
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}
