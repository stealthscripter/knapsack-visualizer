import { Github } from "lucide-react"

function NavBar() {
  return (
    <div className='col-start-2 col-end-7 font-josefin py-8 px-4 text-zinc-200'>
        <ul>
            <li className='md:text-xl font-bold'>
            <a href="https://github.com/stealthscripter/knapsack-visualizer"><Github className="cursor-pointer hover:stroke-zinc-300 duration-300" /></a>
            </li>
        </ul>
    </div>
  )
}

export default NavBar
