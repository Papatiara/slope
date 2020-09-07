const getElement = document.querySelector(".circle")
const getCircle2 = document.querySelector(".circle2")

const getInputX2 = document.getElementById("X2")
const getInputY2 = document.getElementById("Y2")
const getInputX1 = document.getElementById("X1")
const getInputY1 = document.getElementById("Y1")

const getLine = document.getElementById("line")
const getLineInput = document.getElementById("lineInput")

const getField = document.getElementById("field")


//line width function
let lineSize = (x1, x2, y1, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}


const formulaTan = (x1, x2, y1, y2) => {
    let slope = (y2 - y1) / (x2 - x1)
    let radians = Math.atan(slope)
    if (y1 && y2 === 0) {
        return 0;
    }
    return x1 >= x2 ? radians + Math.PI : radians;
}

let beingDragged = ''


const event1 = document.addEventListener("dragover", (e) => {

let y1 = getElement.style.top === "" ? 0 : parseInt(getElement.style.top.split("p")[0])
let y2 = getCircle2.style.top === "" ? 400 : parseInt(getCircle2.style.top.split("p")[0])
let x1 = getElement.style.left === "" ? 0 : parseInt(getElement.style.left.split("p")[0])
let x2 = getCircle2.style.left === "" ? 400 : parseInt(getCircle2.style.left.split("p")[0])

let width = getLine.style.width

    if (beingDragged.classList[0] === "circle") {
        getLine.style.transform = `rotate(${formulaTan(x1, x2, y1, y2)}rad)`

        console.log(x1,y1,x2,y2)

        getLine.style.left = `${e.clientX + 75}px`
        getLine.style.top = `${e.clientY + 75}px`
        getLine.style.width = `${lineSize(y1, y2, x1, x2)}px`

        getInputX1.setAttribute('value', e.clientX)
        getInputY1.setAttribute('value', e.clientY)
        getLineInput.setAttribute('value', width.split('p')[0].slice(0, width.indexOf('.') ))

        beingDragged.style.top = `${e.clientY}px`
        beingDragged.style.left = `${e.clientX}px`
    } else {

        getLine.style.width = `${lineSize(x1, x2, y1, y2)}px`
        getLine.style.transform = `rotate(${formulaTan(x1, x2, y1, y2)}rad)`
        getLineInput.setAttribute('value', width.split('p')[0].slice(0, width.indexOf('.') ))
        getInputX2.setAttribute('value', e.clientX)
        getInputY2.setAttribute('value', e.clientY)

        beingDragged.style.top = `${e.clientY}px`
        beingDragged.style.left = `${e.clientX}px`
    }

});


  
let inputsFields = document.querySelectorAll("input");
let y1 = getElement.style.top === "" ? 0 : parseInt(getElement.style.top.split("p")[0])
let y2 = getCircle2.style.top === "" ? 400 : parseInt(getCircle2.style.top.split("p")[0])
let x1 = getElement.style.left === "" ? 0 : parseInt(getElement.style.left.split("p")[0])
let x2 = getCircle2.style.left === "" ? 400 : parseInt(getCircle2.style.left.split("p")[0])


inputsFields.forEach((el) => {
    el.addEventListener("keyup", (event) => {
        if (event.key === "Backspace" || typeof Number(event.key) !== "number") {
            return;
        }

        if (event.target.id === "X2" || event.target.id === "Y2") {
            if (event.target.id === "X2") {
                x2 = Number(event.target.value);
            } else if (event.target.id === "Y2") {
                y2 = Number(event.target.value);
            }
            getLine.style.width = `${lineSize(x1, x2, y1, y2)}px`
            getLine.style.transform = `rotate(${formulaTan(x1, x2, y1, y2)}rad)`

            getLineInput.setAttribute('value', getLine.style.width.split('p')[0])
            getInputX2.setAttribute('value', x2)
            getInputY2.setAttribute('value', y2)
            getCircle2.style.top = `${y2 + 75}px`
            getCircle2.style.left = `${x2 + 75}px
            `
        } if (event.target.id === "X1" || event.target.id === "Y1") {
            if (event.target.id === "X1") {
                x1 = Number(event.target.value);
            } if (event.target.id === "Y1") {
                y1 = Number(event.target.value);
            }
            getLine.style.width = `${lineSize(x1, x2, y1, y2)}px`
            getLine.style.transform = `rotate(${formulaTan(x1, x2, y1, y2)}rad)`


            getLine.style.left = `${x1 + 75}px`
            getLine.style.top = `${y1 + 75}px`

            getInputX1.setAttribute('value', x1)
            getInputY1.setAttribute('value', y1)
            getLineInput.setAttribute('value', getLine.style.width.split('p')[0])

            getElement.style.top = `${y1}px`
            getElement.style.left = `${x1}px`
        } else {
            getLine.style.width = `${Number(event.target.value)}px`
            let width = Number(event.target.value)
            let rad = formulaTan(x1, x2, y1, y2)

            c = width // hypoteneus
            b = Math.sin(rad) * c // y value
            a = Math.sqrt(Math.pow(c,2) - Math.pow(b,2)) // x value    
            
            
            getCircle2.style.top = `${a}px` 
            getCircle2.style.left = `${b}px`      
        }
    });
})

// remove ghost image when dragging an element

const eventOnCircle2 = getCircle2.addEventListener("dragstart", (e) => {
    beingDragged = e.target;
    var img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
});

const eventOnCircle1 = getElement.addEventListener("dragstart", (e) => {
    beingDragged = e.target;
    var img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    e.dataTransfer.setDragImage(img, 0, 0);
});
