import { findConfigUpwards } from "@babel/core/lib/config/files";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComment = document.getElementById("videoComment");
const commentDeleteBtnAll = document.querySelectorAll(
  ".video__comment__delete-btn"
);

console.log(commentDeleteBtnAll)

const addComment = (text, id, owner, createdAt) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const avatarContainer = document.createElement("a");
  avatarContainer.href = `/users/${owner.id}`;
  const avatarImg = document.createElement("img");
  avatarImg.src = owner.avatarUrl;
  avatarImg.className = "comment__avatar";
  avatarContainer.appendChild(avatarImg);
  newComment.appendChild(avatarContainer);
  const content = document.createElement("div");
  content.className = "video__comment-content";
  const uploader = document.createElement("div");
  content.className = "video__comment-content-uploader";
  const ownerName = document.createElement("span");
  content.className = "comment__owner";
  const ownerLink = document.createElement("a");
  ownerLink.href = `/users/${owner.id}`;
  ownerLink.innerText = `${owner.name}`;
  ownerName.appendChild(ownerLink);
  const createdTime = document.createElement("span");
  createdTime.className = "comment__createdAt";
  createdTime.innerText = `${createdAt.getFullYear()}. ${createdAt.getMonth()+1}. ${createdAt.getDate()}`;
  uploader.appendChild(ownerName);
  uploader.appendChild(createdTime);
  content.appendChild(uploader);
  const detail = document.createElement("div");
  detail.className = "video__comment-content-detail";
  const commentText = document.createElement("span");
  commentText.innerText = ` ${text}`;
  const deleteBtn = document.createElement("span");
  deleteBtn.className = "video__comment__delete-btn";
  deleteBtn.innerText = " X ";
  deleteBtn.addEventListener("click", delComment);
  detail.appendChild(commentText);
  detail.appendChild(deleteBtn);
  content.appendChild(detail);
  newComment.appendChild(content);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await 
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId, owner, createdAt } = await response.json();
    addComment(text, newCommentId, owner, new Date(createdAt));
  }
};

const delComment = async (event) => {
  const parent = event.target.closest(".video__comment");
  const commentId = parent.dataset.id;
  await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });
  parent.remove();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
};

if (videoComment) {
  commentDeleteBtnAll.forEach((btn) =>
    btn.addEventListener("click", delComment)
  );
}

