import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Archive from "./pages/Archive";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </Layout>
  );
}
