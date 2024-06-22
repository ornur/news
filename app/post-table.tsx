'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { SelectPost } from '@/lib/db';
import { deletePost } from './actions';
import { useRouter } from 'next/navigation';

export function PostsTable({
  posts,
  offset,
  isUserAuthorized
}: {
  posts: SelectPost[];
  offset: number | null;
  isUserAuthorized: boolean;
}) {
  const router = useRouter();

  function onClick() {
    router.replace(`/?offset=${offset}`);
  }

  if (!isUserAuthorized) {
    return <p>You are not authorized to view this page</p>;
  }

  return (
    <>
      <form className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Postname</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </TableBody>
        </Table>
      </form>
      {offset !== null && (
        <Button
          className="mt-4 w-40"
          variant="secondary"
          onClick={() => onClick()}
        >
          Next Page
        </Button>
      )}
    </>
  );
}

function PostRow({ post }: { post: SelectPost }) {
  const postId = post.id;
  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <TableRow>
      <TableCell className="font-medium">{post.name}</TableCell>
      <TableCell className="hidden md:table-cell">{post.email}</TableCell>
      <TableCell>{post.postname}</TableCell>
      <TableCell>
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          formAction={deletePostWithId}
          disabled
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}