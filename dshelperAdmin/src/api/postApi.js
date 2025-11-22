// src/api/postApi.js
import baseApi from "@/api/BaseApi";

export const createPost = async (dto, images) => {
  const formData = new FormData();
  formData.append("dto", JSON.stringify(dto));

  if (images && images.length > 0) {
    images.forEach((file) => formData.append("images", file));
  }

  return baseApi.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
