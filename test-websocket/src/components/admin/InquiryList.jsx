import React, { useEffect, useState } from "react";
import axios from "axios";
import InquiryItem from "./InquiryItem";

// ✅ 전역 기본 URL 설정
axios.defaults.baseURL = "https://server.dshelper.kr";

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/inquires/un-replied") // 문의 목록 불러오기
      .then(res => setInquiries(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCancel = (id) => {
    setInquiries(inquiries.filter(item => item.inquiryId !== id));
  };

  // ✅ 답변 완료 시 목록에서 제거 or 상태 업데이트
  const handleReply = (id) => {
    setInquiries(inquiries.filter(item => item.inquiryId !== id));
  };

  return (
    <div>
      <h1>문의 목록</h1>
      {inquiries.length === 0 ? (
        <p>답변이 필요한 문의가 없습니다.</p>
      ) : (
        inquiries.map(inquiry => (
          <InquiryItem
            key={inquiry.inquiryId}
            inquiry={inquiry}
            onCancel={handleCancel}
            onReply={handleReply}
          />
        ))
      )}
    </div>
  );
}

export default InquiryList;
