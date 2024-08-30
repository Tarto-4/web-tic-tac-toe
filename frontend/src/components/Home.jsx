import { Link } from "react-router-dom";
import './Home.css'

const Home=() =>{
    return(
    <div>
    {/* Navigation Links */}
    <h1>WELCOME TO TIC TAC TOE GAME</h1>
    <nav>
      <ul>
        <li>
          <Link className="playwithcomputer" to="/playwithcomputer">Play With PC</Link>
        </li>

        <li>
          <Link className="multipleplayers" to="/multipleplayers">Multiple Players</Link>
        </li>
      </ul>
    </nav>

    {/* Router and Routes */}
    </div>
    )
}
export default Home;