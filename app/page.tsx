// TODO: Find a better way than useEffect to handle pagination
// TODO: Implement Search
// TODO: Implement a sidebar

import PostsFeed from "@/components/posts/PostsFeed";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-8 container">
      {/* Heading */}
      <h1 className="text-xl md:text-3xl">Latest Posts</h1>
      <PostsFeed />
    </div>
  );
}
