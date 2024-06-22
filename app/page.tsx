import { getPosts } from '@/lib/db';
import { PostsTable } from './post-table';
import { Search } from './search';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string; offset: string };
}) {
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  // const { posts, newOffset } = await getPosts(search, Number(offset));

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <div className="flex items-center mb-8">
        <h1 className="font-semibold text-lg md:text-2xl">Posts</h1>
      </div>
      <div className="w-full mb-4">
        <Search value={searchParams.q} />
      </div>
      {/* <PostsTable posts={posts} offset={newOffset} /> */}
    </main>
  );
}