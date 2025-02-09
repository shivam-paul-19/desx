function generater(fabricCanvas) {
    let html = "";

    function calculateAngle(obj) {
        const angleInRadians = Math.atan2(obj.height, obj.width);
        const angleInDegrees = angleInRadians * (180 / Math.PI);
        return angleInDegrees;
    }

    fabricCanvas.forEach(obj => {
        let width = Math.floor(obj.width * obj.scaleX);
        let height = Math.floor(obj.height * obj.scaleY);
        let style = `position:absolute; left:${Math.floor(obj.left)}px; top:${Math.floor(obj.top)}px;`;

        // Apply stroke and fill where applicable
        if (obj.stroke && obj.strokeWidth > 0) {
            style += `border:${obj.strokeWidth}px solid ${obj.stroke};`;
        }

        if (obj.fill && obj.type !== 'i-text') {
            style += `background-color:${obj.fill};`;
        }

        if (obj.type === 'rect') {
            html += `<div style="width:${width}px; height:${height}px; ${style}"></div>\n`;
        } 

        else if (obj.type === 'circle') {
            html += `<div style="width:${width}px; height:${height}px; border-radius:50%; ${style}"></div>\n`;
        } 

        else if (obj.type === 'triangle') {
            const baseWidth = obj.width;
            const height = obj.height;
            const color = obj.fill;
    
            html += `<div style="width: 0; height: 0; border-left: ${baseWidth / 2}px solid transparent; border-right: ${baseWidth / 2}px solid transparent; border-bottom: ${height}px solid ${color}; position: absolute; top: ${obj.top}px; left: ${obj.left}px;"></div>`; 
        } 

        // TODO
        else if (obj.type === 'line') {
            const angle = calculateAngle(obj);
            html += `<div style="width: ${obj.width}px; height: 0; border-top: ${obj.strokeWidth}px solid ${obj.stroke}; transform: rotate(${180-angle}deg); position: absolute; top: ${obj.top}px; left: ${obj.left}px;"></div>`;
        } 

        else if (obj.type === 'i-text') {
            let textStyle = `color:${obj.fill}; font-family:${obj.fontFamily}; font-size:${obj.fontSize}px; background:transparent;`;
            if (obj.fontWeight === 'bold') textStyle += "font-weight:bold;";
            if (obj.fontStyle === 'italic') textStyle += "font-style:italic;";
            if (obj.underline) textStyle += "text-decoration:underline;";
            html += `<p style="${textStyle} ${style}">${obj.text}</p>\n`;
        } 

        else if (obj.type === 'image') {
            html += `<img src="${obj.htmlSrc}" style="width:${width}px; height:${height}px; ${style}">\n`;
        }
    });

    return html;
}


export default generater;