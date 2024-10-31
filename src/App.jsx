import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { Suspense } from "react";
import LazySpinner from "@/widgets/lazy-load-spinner/LazySpinner";

function App() {
  return (
    <Suspense fallback={<LazySpinner />}>
      <Routes>
        <Route
          path="/dashboard/*"
          element={<AuthOutlet fallbackPath={"/auth/sign-in"} />}
        >
          <Route path="*" element={<Dashboard />} />
          </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </Suspense>
  );
}

export default App;
