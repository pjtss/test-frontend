// src/components/posts/PostCreateForm.jsx
import { useState } from "react";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { createPost } from "@/api/postApi";

export default function PostCreateForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    const dto = { title, content };

    try {
      await createPost(dto, images);
      alert("게시글이 성공적으로 등록되었습니다! 💚");
      setTitle("");
      setContent("");
      setImages([]);
    } catch (err) {
      console.error(err);
      alert("게시글 등록 실패 😢");
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: 24,
        borderRadius: 14,
        border: "1px solid #e8f5e9",
        boxShadow: "0 3px 10px rgba(0,0,0,0.07)",
      }}
    >
      <h2
        style={{
          fontSize: 22,
          marginBottom: 20,
          fontWeight: 700,
          color: "#4CAF50",
        }}
      >
        ✏️ 게시글 작성하기
      </h2>

      <TextInput
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="게시글 제목을 입력하세요"
      />

      <TextArea
        label="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />

      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: 600, display: "block", marginBottom: 6 }}>
          이미지 업로드
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files))}
        />
      </div>

      <Button onClick={handleSubmit} disabled={!title || !content}>
        게시글 등록
      </Button>
    </div>
  );
}
