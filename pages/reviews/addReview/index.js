import Header from "../../../components/header";
import AddReviewBody from "./addReviewBody";
import LogInBody from "../../../components/logInBody";
import { useSession } from "next-auth/react"

export default function Reviews() {
    
  const { data: session } = useSession()
  
  return (
    <>
        <Header />
        {session ? <AddReviewBody /> : <LogInBody page={"review"}/>}
    </>
)}