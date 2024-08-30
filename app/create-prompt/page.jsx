"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

export default function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          creator: session?.user.id, // Use session user ID as the creator
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
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
}

// export default function CreatePrompt() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const [submitting, setSubmitting] = useState(false);
//   const [post, setPost] = useState({
//     prompt: "",
//     tag: "",
//     creator: "",
//   });
//   console.log(post);
//   const createPrompt = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     // calling the api
//     try {
//       const res = await fetch("/api/prompt/new", {
//         method: "POST",
//         body: JSON.stringify({
//           prompt: post.prompt,
//           userId: session?.user.id,
//           creator: post.userId,
//           tag: post.tag,
//         }),
//       });
//       if (res.ok) {
//         router.push("/");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <Form
//         type="Create"
//         post={post}
//         setPost={setPost}
//         submitting={submitting}
//         handleSubmit={createPrompt}
//       />
//     </div>
//   );
// }
