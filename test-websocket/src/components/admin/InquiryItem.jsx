import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://server.dshelper.kr";

function InquiryItem({ inquiry, onCancel, onReply }) {
  const [replyContent, setReplyContent] = useState("");
  const [open, setOpen] = useState(false); // ✅ 답변창 열림 상태

  const cancelInquiry = () => {
    axios.patch(`/api/inquiries/${inquiry.inquiryId}/cancel`)
      .then(() => onCancel(inquiry.inquiryId))
      .catch(err => console.error(err));
  };

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
      setOpen(false); // 답변 후 닫기
      onReply(inquiry.inquiryId);
    })
    .catch(err => {
      console.error(err);
      alert("답변 등록 중 오류가 발생했습니다.");
    });
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
      {/* 제목 클릭 시 답변창 열기 */}
      <h3
        style={{ cursor: "pointer", color: open ? "#007bff" : "black" }}
        onClick={() => setOpen(!open)}
      >
        {inquiry.title}
      </h3>
      <p>{inquiry.content}</p>
      <p><small>작성일: {inquiry.createdAt}</small></p>

      {/* ✅ 답변창은 open 상태일 때만 보임 */}
      {open && (
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
      )}
    </div>
  );
}

export default InquiryItem;
