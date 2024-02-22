import PostList from "@/components/PostList";


export default function Home() {

  return (
    <div className="py-10 flex flex-col items-center gap-6 mx-auto bg-zinc-800">
      <PostList/>
    </div>
   
  );
}
