"use client";
import React from "react";
import ProfileCard from "./ProfileCard";

/**
 * In this child component we import the props from the the parent component
 * to render the profile page data.
 */
export default function Profile({
  name,
  data,
  desc,
  handleEdit,
  handleDelete,
}) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <ProfileCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}
