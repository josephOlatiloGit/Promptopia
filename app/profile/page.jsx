"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Profile from "@components/Profile";

export default function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/posts/${session?.user._id}`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user._id) fetchPosts();
  }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch("/api/prompt");
  //     const data = await res.json();
  //     setPosts(data);
  //   };
  //   fetchPosts();
  // }, []);

  const handleEdit = () => {};
  const handleDelete = async () => {};

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={[posts]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
