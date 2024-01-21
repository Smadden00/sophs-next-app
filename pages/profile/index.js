import Header from "../../components/header";
import LogInBody from "../../components/logInBody"
import { useSession } from "next-auth/react"
import LoggedInProfileBody from "./loggedInProfileBody";

export default function Profile() {
  const { data: session } = useSession()

  return (
    <>
        <Header />
        {session ? <LoggedInProfileBody /> : <LogInBody page={"view your profile"}/>}
    </>
)}