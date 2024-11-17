import { useEffect } from "react";
import axios from "axios";

function Home() {
    let data = {
        name: 'Shivam',
        age: 20
    };

    useEffect(async () => {
        axios.get('/test');
        await axios.post('/test_post', data);
    }, []);

    return (
        <div>
            <h1 style={{
                color: "white"
            }}>Ye home hai</h1>
        </div>
    )
}

export default Home;