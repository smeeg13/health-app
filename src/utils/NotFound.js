import { Link } from "react-router-dom";
import error404 from "../pages/img/error404.png"

/**
 * This Component allow us to display a 404 page
 */
export default function NotFound() {
    return (
        <div>
            <h1>Oops! You seem to be lost.</h1>
            <img src={error404} alt="Error 404"></img>
            <br></br>
            <Link className="error_redirection" to='/'>Go back to homepage</Link>
            
        </div>
    )
}