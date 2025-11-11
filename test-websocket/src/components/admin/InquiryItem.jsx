import React from "react";
import axios from "axios";

// ✅ 전역 기본 URL 설정
axios.defaults.baseURL = "https://server.dshelper.kr";

function InquiryItem({ inquiry, onCancel }) {
  const cancelInquiry = () => {
    axios.patch(`/api/inquiries/${inquiry.inquiryId}/cancel`)
      .then(() => onCancel(inquiry.inquiryId))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h3>{inquiry.title}</h3>
      <p>{inquiry.content}</p>
      <p>{inquiry.createdAt}</p>
      <button onClick={cancelInquiry}>취소</button>
    </div>
  );
}

export default InquiryItem;
