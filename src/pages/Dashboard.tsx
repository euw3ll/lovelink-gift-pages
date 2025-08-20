import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Heart,
  Home,
  MessageCircle,
  Plus,
  Search,
  Send,
  User,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

interface Post {
  id: number;
  image: string;
  caption: string;
  likes: number;
  comments: string[];
}

const initialPosts: Post[] = [
  {
    id: 1,
    image: "https://placekitten.com/600/400",
    caption: "Primeiro post",
    likes: 0,
    comments: [],
  },
  {
    id: 2,
    image: "https://placekitten.com/601/401",
    caption: "Outro dia maravilhoso",
    likes: 0,
    comments: [],
  },
];

const stories = [
  "https://placekitten.com/200/200",
  "https://placekitten.com/201/200",
  "https://placekitten.com/202/200",
  "https://placekitten.com/203/200",
  "https://placekitten.com/204/200",
];

const PostItem = ({
  post,
  onLike,
  onComment,
}: {
  post: Post;
  onLike: (id: number) => void;
  onComment: (id: number, comment: string) => void;
}) => {
  const [comment, setComment] = useState("");
  return (
    <div className="mb-6">
      <img src={post.image} alt="post" className="w-full" />
      <div className="p-4">
        <div className="mb-2 flex items-center gap-4">
          <Heart
            className="h-6 w-6 cursor-pointer"
            onClick={() => onLike(post.id)}
          />
          <MessageCircle className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold">{post.likes} likes</p>
        <p className="mb-2 text-sm">{post.caption}</p>
        {post.comments.map((c, i) => (
          <p key={i} className="text-xs">
            <span className="font-semibold">Usuário:</span> {c}
          </p>
        ))}
        <div className="mt-2 flex items-center gap-2">
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Adicionar comentário"
            className="h-8"
          />
          <button
            className="text-sm text-blue-500"
            onClick={() => {
              onComment(post.id, comment);
              setComment("");
            }}
          >
            Postar
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleComment = (id: number, comment: string) => {
    if (!comment) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, comments: [...p.comments, comment] } : p
      )
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between border-b p-4">
        <Camera className="h-6 w-6" />
        <h1 className="text-xl font-bold">Lovelink</h1>
        <div className="flex gap-4">
          <Plus className="h-6 w-6" />
          <Send className="h-6 w-6" />
        </div>
      </nav>

      {/* Stories */}
      <Carousel className="border-b py-4">
        <CarouselContent className="-ml-2 flex gap-4 pl-2">
          {stories.map((src, index) => (
            <CarouselItem key={index} className="basis-auto">
              <img
                src={src}
                alt="story"
                className="h-16 w-16 rounded-full border-2"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Posts */}
      <div className="flex-1 overflow-y-auto pb-20">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <div className="flex justify-around p-2">
          <Home className="h-6 w-6" />
          <Search className="h-6 w-6" />
          <Plus className="h-6 w-6" />
          <Heart className="h-6 w-6" />
          <User className="h-6 w-6" />
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
