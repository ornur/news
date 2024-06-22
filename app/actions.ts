'use server';

import { deletePostById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deletePost(postId: number) {
  // Uncomment this to enable deletion
  await deletePostById(postId);
  revalidatePath('/');
}