import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Challenge from "./pages/Challenge";
import Profile from "./pages/Profile";
import Hackathon from "./pages/Hackathon";
import EditorPage from "./pages/EditorPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProblemList from "./pages/ProblemList";
import AdminCreateContest from "./pages/AdminCreateContest";
import MCQArena from "./pages/MCQArena";
import MCQResult from "./pages/MCQResult";
import AdminContestResults from "./pages/AdminContestResults";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* User Routes */}
            <Route index element={<Home />} />
            <Route path="problems" element={<ProblemList />} />
            <Route path="challenge/:id" element={<Challenge />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="hackathon/:id" element={<Hackathon />} />
            <Route path="arena/:id" element={<MCQArena />} />
            <Route path="mcq-result/:id" element={<MCQResult />} />

            {/* Admin Routes */}
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/problems" element={<AdminDashboard />} />
            <Route path="admin/create" element={<AdminCreateContest />} />
            <Route path="admin/results/:id" element={<AdminContestResults />} />

            {/* Practice Route (Special Case) */}
            <Route path="practice/:id" element={<EditorPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
