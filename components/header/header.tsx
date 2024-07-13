import Link from "next/link"
import Menu from "./menu"
import ShowConnect from "../showConnect/page"


const Header = () => {
    
    return(
    <header>
        <nav>
        <div className = "navbar justify-between bg-base-300">
        <Link href = "/" className ="text-lg">
        BlueSky BookStore
        </Link>
        <Menu/>
        </div>
        </nav>
        <ShowConnect/>
    </header>

    )
}

export default Header