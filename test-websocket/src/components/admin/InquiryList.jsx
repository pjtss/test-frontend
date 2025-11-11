import React, { useEffect, useState } from "react";
import axios from "axios";
import InquiryItem from "./InquiryItem";

// ✅ 전역 기본 URL 설정
axios.defaults.baseURL = "https://server.dshelper.kr";

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    axios
      .get("/admin/inquires/un-replied") // 자동으로 https://server.dshelper.kr/api/inquiries
      .then(res => setInquiries(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCancel = (id) => {
    setInquiries(inquiries.filter(item => item.inquiryId !== id));
  };

  return (
    <div>
      <h1>문의 목록</h1>
      {inquiries.map(inquiry => (
        <InquiryItem
          key={inquiry.inquiryId}
          inquiry={inquiry}
          onCancel={handleCancel}
        />
      ))}
    </div>
  );
}

export default InquiryList;
