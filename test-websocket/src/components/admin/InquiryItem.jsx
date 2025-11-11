import React, { useState } from "react";
import axios from "axios";

// ✅ 전역 기본 URL 설정
axios.defaults.baseURL = "https://server.dshelper.kr";

function InquiryItem({ inquiry, onCancel, onReply }) {
  const [replyContent, setReplyContent] = useState("");

  // ✅ 문의 취소
  const cancelInquiry = () => {
    axios.patch(`/api/inquiries/${inquiry.inquiryId}/cancel`)
      .then(() => onCancel(inquiry.inquiryId))
      .catch(err => console.error(err));
  };

  // ✅ 답변 등록
  const submitReply = () => {
    if (!replyContent.trim()) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    axios.post("/replies", {
      inquiryId: inquiry.inquiryId,
      content: replyContent
    })
    .then(() => {
      alert("답변이 등록되었습니다.");
      setReplyContent("");
      onReply(inquiry.inquiryId);
    })
    .catch(err => {
      console.error(err);
      alert("답변 등록 중 오류가 발생했습니다.");
    });
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
      <h3>{inquiry.title}</h3>
      <p>{inquiry.content}</p>
      <p><small>작성일: {inquiry.createdAt}</small></p>

      <div style={{ marginTop: "10px" }}>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="답변 내용을 입력하세요"
          rows="3"
          style={{ width: "100%", resize: "none" }}
        />
        <div style={{ marginTop: "5px" }}>
          <button onClick={submitReply}>답변하기</button>
          <button onClick={cancelInquiry} style={{ marginLeft: "10px" }}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default InquiryItem;
