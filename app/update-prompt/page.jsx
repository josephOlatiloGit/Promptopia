"use client";
import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, useSearchParams } from "next/navigation";

import Form from "@components/Form";

export default function EditPrompt() {
  const router = useRouter();
  //   const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails(); //call the function if promptId exist
  }, [promptId]);

  const UpdatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      return alert("Prompt ID not found");
    }

    try {
      const res = await fetch(`/api/prompt/${getPromptDetails}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={() => {
          UpdatePrompt;
        }}
      />
    </div>
  );
}
