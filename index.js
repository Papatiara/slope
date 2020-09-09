
document.addEventListener("DOMContentLoaded", () => {

    const circle1 = document.querySelector(".circle");
    const circle2 = document.querySelector(".circle2");

    const inputsCircle1 = circle1.querySelectorAll('input');
    const inputsCircle2 = circle2.querySelectorAll('input');

    const getLine = document.getElementById("line");
    const getLineInput = getLine.querySelectorAll("input");

   ;
   

    let x1 = Number(inputsCircle1[0].value);
    let y1 = Number(inputsCircle1[1].value);
    let x2 = Number(inputsCircle2[0].value);
    let y2 = Number(inputsCircle2[1].value);



    /// Distance formula
    /// Input: integers => x and y coordinates;
    /// Output: integer =>  width
    const findWidth = (x, y) => {
        return Math.trunc(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))
    }

    // Slope Formula
    /// Input: integers => x and y coordinates;
    /// Output: decimal =>  tangent in radians;

    const formulaTan = (x, y) => {
        let slope = y / x;
        let radians = Math.atan(slope)

        if (x === 0) {
            if (y < 0) {
                return Math.atan(-90)
            }
            return Math.atan(90);
        }
        else if (x < 0) {
            return radians + Math.PI
        }

        return radians;
    }
  
    // Set line and circles in the screen
    // Input: 5 integers=> each circle coordinates and optional parameter - line distance ;
    // Output:void;

    const setPoints = (x1, x2, y1, y2, w="width") => {
        let x = x2 - x1;
        let y = y2 - y1;
        let width = typeof w === "string" ? findWidth(x, y) : w;


        inputsCircle1[0].setAttribute("value", x1);
        inputsCircle1[1].setAttribute("value", y1);
        inputsCircle2[0].setAttribute("value", x2);
        inputsCircle2[1].setAttribute("value", y2);
        getLineInput[0].setAttribute("value", `${width}`);

        circle1.style.left = `${x1}px`;
        circle1.style.top = `${y1}px`;

        setTimeout(() =>{
            let midPoint = getLineInput[0].getBoundingClientRect()
            midPointLeft = Math.trunc(midPoint.left);
            midPointTop = Math.trunc(midPoint.top);
            let top = (midPointTop * 2) - y1;
            let left = (midPointLeft * 2) - x1;
            circle2.style.left = `${left}px`;
            circle2.style.top = `${top}px`;
            inputsCircle2[0].setAttribute("value", left);
            inputsCircle2[1].setAttribute("value", top);
        }, 0);

        getLine.style.transform = `rotate(${formulaTan(x, y)}rad)`
        getLine.style.width = `${width+75}px`;
        getLine.style.top = `${y1 + 75}px`;
        getLine.style.left = `${x1 + 75}px`;
    }


    // Event listener = drag event
    // set values of x1,y1,x2,y2
    // Input:none;
    // Return:function call setPoints with coordinates;


    let beingDragged = circle2;

    const dragEvent = document.addEventListener("dragover", (e) => {

        if (beingDragged.classList.value === "circle") {
            x1 = e.clientX;
            y1 = e.clientY;
        } else {
            x2 = e.clientX;
            y2 = e.clientY;
        }
        return setPoints(x1, x2, y1, y2)
    });

    // Event listener = input event
    // set values of x1,y1,x2,y2 and width
    // Input:none;
    // Return:function call setPoints with coordinates;
    
    const inputEvent = document.addEventListener("input", (event) => {
        x1 = event.target.id === "X1" ? Number(event.target.value) : x1;
        y1 = event.target.id === "Y1" ? Number(event.target.value) : y1;
        x2 = event.target.id === "X2" ? Number(event.target.value) : x2;
        y2 = event.target.id === "Y2" ? Number(event.target.value) : y2;
        let width = event.target.id === "lineInput" ? Number(event.target.value) : getLineInput[0].getAttribute("value")
 
        return setPoints(x1, x2, y1, y2, width)
    })

    // Event listener = drag start event
    // set element beign drag
    // Input:none;
    // Return:void;

    circle1.addEventListener("dragstart", (e) => {
        beingDragged = e.target;
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);
    });

    circle2.addEventListener("dragstart", (e) => {
        beingDragged = e.target;
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);
    });



});








