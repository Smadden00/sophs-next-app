import Header from "../../../components/header";
import AddRecipeBody from "./addRecipeBody";
import LogInBody from "../../../components/logInBody";
import { useSession } from "next-auth/react"

export default function AddRecipe() {

    const { data: session } = useSession()
    
  return (
    <>
        <Header />
        {session ? <AddRecipeBody /> : <LogInBody pagePurpose={"add a recipe"}/>}
    </>
)}