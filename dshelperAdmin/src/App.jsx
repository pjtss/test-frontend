// App.jsx
import Dshelper from "@/components/Dshelper";
import InquiryList from "@/components/admin/InquiryList";
import AdminReservations from "@/services/PersonalReservationService.jsx";
import PostCreatePage from "@/pages/PostCreatePage.jsx";
import AdminLayout from "@/layout/AdminLayout.jsx";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* 일반 사용자 페이지 */}
      <Route path="/" element={<Dshelper />} />

      {/* 관리자 페이지 - AdminLayout 적용 */}
      <Route
        path="/admin/inquiry"
        element={
          <AdminLayout>
            <InquiryList />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/reservations"
        element={
          <AdminLayout>
            <AdminReservations />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/create-post"
        element={
          <AdminLayout>
            <PostCreatePage />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;
