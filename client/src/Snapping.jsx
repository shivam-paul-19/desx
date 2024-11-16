import { Line } from "fabric";
const snappingDistnace = 10;

export const handleObjectMoving = (canvas, object, guideLines, setGuideLines) => {
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;

    const top = object.top;
    const left = object.left;
    const right = left + object.width * object.scaleX;
    const bottom = top + object.height * object.scaleY;

    const centerX = left + (object.width * object.scaleX) / 2;
    const centerY = top + (object.height * object.scaleY) / 2;

    let newGuidelines = [];
    clearGuidelines(canvas);

    let snapped = false;

    if(Math.abs(left) < snappingDistnace) {
        object.set({ left: 0 });
        if(!guideLineExists(canvas, 'vertical-left')) {
            const line = createVerticalLines(canvas, 0, 'vertical-left');
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    if(Math.abs(top) < snappingDistnace) {
        object.set({ top: 0 });
        if(!guideLineExists(canvas, 'horizontal-top')) {
            const line = createHorizontalLines(canvas, 0, 'horizontal-top');
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    if(Math.abs(right - canvasWidth) < snappingDistnace) {
        object.set({ left: canvasWidth - object.width * object.scaleX});
        if(!guideLineExists(canvas, 'vertical-right')) {
            const line = createVerticalLines(canvas, canvasWidth, 'vertical-right');
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    if(Math.abs(bottom - canvasHeight) < snappingDistnace) {
        object.set({ top: canvasHeight - object.height * object.scaleY });
        if(!guideLineExists(canvas, 'horizontal-bottom')) {
            const line = createHorizontalLines(canvas, canvasHeight, 'horizontal-bottom');
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    if(Math.abs(centerX - canvasWidth / 2) < snappingDistnace) {
        object.set({ left: canvasWidth / 2 - (object.width * object.scaleX) / 2 });
        if(!guideLineExists(canvas, 'vertical-center')) {
            const line = createVerticalLines(canvas, canvasWidth / 2, 'vertical-center');
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    if(Math.abs(centerY - canvasHeight / 2) < snappingDistnace) {
        object.set({ top: canvasHeight / 2 - (object.height * object.scaleY) / 2 });
        if(!guideLineExists(canvas, 'horizontal-center')) {
            const line = createHorizontalLines(canvas, canvasHeight / 2, 'horizontal-center');
            newGuidelines.push(line);
            canvas.add(line);
        }
        snapped = true;
    }

    if(!snapped) {
        document.addEventListener("mouseup", () => {
            clearGuidelines(canvas);
        })
    } else {
        setGuideLines(newGuidelines);
    }

    canvas.renderAll();
}

export const createVerticalLines = (canvas, x, id) => {
    return new Line([x, 0, x, canvas.height], {
        id,
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        strokeDashArray: [5, 5],
        opacity: 0.8
    });
}

export const createHorizontalLines = (canvas, y, id) => {
    return new Line([0, y, canvas.width, y], {
        id, 
        stroke: 'red',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        strokeDashArray: [5, 5],
        opacity: 0.8
    });
}

export const clearGuidelines = (canvas) => {
    const objs = canvas.getObjects('line');
    objs.forEach((obj) => {
        if(obj.id && obj.id.startsWith('vertical-') || obj.id && obj.id.startsWith('horizontal-')) {
            canvas.remove(obj);
        }
    });

    canvas.renderAll();
}

export const guideLineExists = (canvas) => {
    const objs = canvas.getObjects('line');
    return objs.some((obj) => obj.id === id);
}
