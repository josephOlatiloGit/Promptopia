"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Profile from "@components/Profile";

export default function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/posts/${session?.user._id}`);
      const data = await res.json();
      setPosts(data);
    };
    if (session?.user._id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`); //To navigate to the edit page
  };
  // Check if the action is confirmed with the browser built in confirm method:
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure ou want to delete this prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
