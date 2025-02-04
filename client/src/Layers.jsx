import './layers.css'

function Layers({ panel }) {
    console.log(`panel: ${typeof(panel)}`);
    console.log(`panel: ${panel}`);
    return (
        <div className="layer-panel">
            Layers
            <ul>
                {panel.map((el) => 
                    <li>{el}</li>
                )}
            </ul>
        </div>
    )
}

export default Layers;