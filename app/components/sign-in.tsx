
import { signIn } from "../api/auth/[...nextauth]/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with1232 GitHub</button>
    </form>
  )
} 