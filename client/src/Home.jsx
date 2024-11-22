import { useEffect } from "react";
import axios from "axios";

function Home({user}) {
    return (
        <div>
            <h1>Welocome {user}</h1>
        </div>
    )
}

export default Home;