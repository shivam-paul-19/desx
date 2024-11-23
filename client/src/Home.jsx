import { useEffect } from "react";
import axios from "axios";
import './home.css';

function Home({user}) {
    return (
        <div className="home_page">
            <img id="home_img" src="https://i.ibb.co/RDMkY25/text-logo-color.png" alt="" />
            <h1 id="welcome">Welcome {user}</h1>
        </div>
    )
}

export default Home;