"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

// /**
//  Here we pass some props to the PromptCard component to make the comp dynamic
//  */

// export default function PromptCard({
//   post,
//   handleTagClick,
//   handleEdit,
//   handleDelete,
// }) {
//   return (
//     <div className="prompt_card">
//       <div className="flex justify-between items-start gap-5">
//         <div className="">
//           {post.creator?.image ? (
//             <Image
//               src={post.creator.image}
//               alt="user_image"
//               width={40}
//               height={40}
//               className="rounded-full object-contain"
//             />
//           ) : (
//             <div className="default-avatar">
//               {" "}
//               {/* You can add a default avatar or leave it blank */}
//               <Image
//                 src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" // Add a default image if the creator image is not available
//                 alt="default_user_image"
//                 width={40}
//                 height={40}
//                 className="rounded-full object-contain"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) {
  const [copied, setCopied] = useState("");

  // To copy to clipboard:
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={
              post.creator?.image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt=""
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 ">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>

    // <div className="prompt_card">
    //   <div className="flex justify-between items-start gap-5">
    //     <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
    //       <div className="flex flex-col">
    //         <h3 className="font-satoshi font-semibold text-gray-900">
    //           {post.username}
    //         </h3>
    //         <p className="font-inter text-sm text-gray-500">{post.email}</p>
    //       </div>
    //     </div>
    //     <div className="copy_btn" onClick={handleCopy}>
    //       <Image
    //         src={
    //           copied === post.prompt
    //             ? "/assets/icons/tick.svg"
    //             : "/assets/icons/copy.svg"
    //         }
    //         alt=""
    //         width={12}
    //         height={12}
    //       />
    //     </div>
    //   </div>
    //   <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
    //   <p
    //     className="font-inter text-sm blue_gradient cursor-pointer"
    //     onClick={() => handleTagClick && handleTagClick(post.tag)}
    //   >
    //     {post.tag}
    //   </p>
    // </div>
  );
}
