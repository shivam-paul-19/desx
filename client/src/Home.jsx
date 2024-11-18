import { useEffect } from "react";
import axios from "axios";

function Home() {
    let data = {
        name: 'Shivam',
        age: 20
    };

    return (
        <div>
            <h1 style={{
                color: "white"
            }}>Ye home hai</h1>
        </div>
    )
}

export default Home;