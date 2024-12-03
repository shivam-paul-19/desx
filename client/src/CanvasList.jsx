import "./canvaslist.css";

function CanvasList({ canvases, loadCanvas }) {
  return (
    <div>
      <div className="canvas-label-head">
        <span>Name</span>
        <span>Last updated</span>
      </div>
      <div className="canvas_list">
        <ul>
          {canvases.map((c) => {
            let date = new Date(c[1]);
            date = date.toLocaleString("en-IN");
            return (
              <li>
                <div className="canvas-label" onClick={loadCanvas}>
                  <span>{c[0]}</span>
                  <span>{date}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CanvasList;
