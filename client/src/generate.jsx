function generater(fabricCanvas) {
    let html = "";

    function calculateAngle(obj) {
        return obj.angle || (Math.atan2(obj.y2 - obj.y1, obj.x2 - obj.x1) * (180 / Math.PI));
    }
    
    function calculateLength(obj) {
        return Math.sqrt(Math.pow(obj.x2 - obj.x1, 2) + Math.pow(obj.y2 - obj.y1, 2));
    }

    fabricCanvas.forEach(obj => {
        let width = Math.floor(obj.width * obj.scaleX);
        let height = Math.floor(obj.height * obj.scaleY);

        let style = `position:absolute; left:${Math.floor((obj.left*100)/1000)}%; top:${Math.floor((obj.top*100)/500)}%;`;
        if(obj.type === 'i-text') {
            style = `position:absolute; left:${Math.floor((obj.left*100)/1000)}%; top:${Math.floor((obj.top*100)/500) < 20? 0: Math.floor((obj.top*100)/500) - 3}%;`;
        }
        
        // Apply stroke and fill where applicable
        if (obj.stroke && obj.strokeWidth > 0) {
            style += `border:${obj.strokeWidth}px solid ${obj.stroke};`;
        }

        if (obj.fill && obj.type !== 'i-text') {
            style += `background-color:${obj.fill};`;
        }
        
        if (obj.type === 'rect') {
            height = (height>500)? 100: Math.round((height/500)*100);
            width = (width > 1000)? 100: Math.round((width/1000)*100);
            html += `<div style="width:${width}%; height:${height}%; ${style}"></div>\n`;
        } 

        else if (obj.type === 'circle') {
            html += `<div style="width:${width}%; height:${height}%; border-radius:50%; ${style}"></div>\n`;
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
            const length = calculateLength(obj);
            
            html += `<div style="
                width: ${length}px; 
                height: 0; 
                border-top: ${obj.strokeWidth}px solid ${obj.stroke}; 
                position: absolute; 
                top: ${obj.top}px; 
                left: ${obj.left}px; 
                transform: rotate(${angle}deg);transform-origin: left center;"></div>`;
        }

        else if (obj.type === 'i-text') {
            let textStyle = `color:${obj.fill}; font-family:${obj.fontFamily}; font-size:${obj.fontSize + 10}px;`;
            if (obj.fontWeight === 'bold') textStyle += "font-weight:bold;";
            if (obj.fontStyle === 'italic') textStyle += "font-style:italic;";
            if (obj.underline) textStyle += "text-decoration:underline;";
            html += `<p style="${textStyle} ${style}">${obj.text}</p>\n`;
        } 

        else if (obj.type === 'image') {
            height = (height>500)? 100: Math.round((height/500)*100);
            html += `<img src="${obj.htmlSrc}" style="height:${height}%; ${style}">\n`;
        }
    });

    return html;
}


export default generater;