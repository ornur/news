import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';

export async function User() {
  const session = await auth();

  return (
    <div className="flex items-center gap-4">
      <form
        action={async () => {
           'use server';
          await signOut();
        }}
      >
      <Button variant="outline">Sign out</Button>
      </form>
    </div>
  );
}