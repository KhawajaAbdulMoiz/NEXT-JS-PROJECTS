
import Link from "next/link"

export default function Navbar(){
    return(
        <div className="container">
            <Link href={"https://github.com/KhawajaAbdulMoiz/"}>
                <img src="github.png" alt="github" />
            </Link>
            <Link href={"https://www.linkedin.com/in/khawaja-abdul-moiz/"}>
                <img src="linkedin.png" alt="linkedin" />
            </Link>
        </div>
    )
}


