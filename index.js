
document.addEventListener("DOMContentLoaded", () => {


    const getElement = document.querySelector(".circle")
    const getCircle2 = document.querySelector(".circle2")


    const getLine = document.getElementById("line")

    const getLineInput = document.getElementById("lineInput")

    let y1 = getElement.style.top === "" ? 0 : parseInt(getElement.style.top.split("p")[0])
    let y2 = getCircle2.style.top === "" ? 400 : parseInt(getCircle2.style.top.split("p")[0])
    let x1 = getElement.style.left === "" ? 0 : parseInt(getElement.style.left.split("p")[0])
    let x2 = getCircle2.style.left === "" ? 400 : parseInt(getCircle2.style.left.split("p")[0])

// slope function
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

// line function 
    const lineSize = (x, y) => {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    }

// left circle left margin
    const circle2Left = (x, y) => {
        let width = Number(getLine.style.width.split('p').slice(0, getLine.style.width.indexOf('.')));
        console.log(width)
        let rad = formulaTan(x, y)

        c = width;
        b = Math.sin(rad) * c
        a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2))

        return a;
    }

// left circle top margin

    const circle2Top = (x, y) => {
        let width = Number(getLine.style.width.split('p').slice(0, getLine.style.width.indexOf('.')));
        let rad = formulaTan(x, y)

        c = width
        b = Math.sin(rad) * c
        a = Math.sqrt(Math.pow(c, 2) - Math.pow(b, 2))
        return b;
    }

    // Dragover eventListener

    let beingDragged = ''
    const event1 = document.addEventListener("dragover", (e) => {
        e.preventDefault();

        let inputValue = beingDragged.querySelectorAll('input');

        let x = beingDragged.classList[0] === "circle" ? x2 - e.clientX : e.clientX - x1;
        let y = beingDragged.classList[0] === "circle" ? y2 - e.clientY : e.clientY - y1;

        let width = getLine.style.width;

        getLine.style.width = `${lineSize(x, y)}px`
        getLine.style.transform = `rotate(${formulaTan(x, y)}rad)`
        getLineInput.setAttribute('value', width.split('p')[0].slice(0, width.indexOf('.')))

        inputValue[0].setAttribute('value', e.clientX);
        inputValue[1].setAttribute('value', e.clientY);

        beingDragged.style.top = `${e.clientY}px`
        beingDragged.style.left = `${e.clientX}px`



        if (beingDragged.classList[0] === "circle") {
            getLine.style.left = `${e.clientX + 75}px`
            getLine.style.top = `${e.clientY + 75}px`
            x1 = e.clientX
            y1 = e.clientY
        } else {
            x2 = e.clientX
            y2 = e.clientY
        }

    }, false);



    // InputFields eventListener


    let inputsFields = document.querySelectorAll("input");
    inputsFields.forEach((el) => {
        el.addEventListener("keyup", (event) => {
            if (event.target.value === 0 && event.key === "Backspace" || typeof Number(event.key) !== "number") {
                return 0;
            }

            let inputParent = event.target.offsetParent;
            let width = getLine.style.width;
            let x = x2 - x1;
            let y = y2 - y1;


            if (event.target.id !== "lineInput") {
                if (event.target.id === "X2" || event.target.id === "X1") {
                    if (event.target.id === "X1") {
                        x1 = Number(event.target.value)
                        x = x2 - x1;
                        inputParent.style.left = `${Number(event.target.value)}px`
                        getLine.style.left = `${Number(event.target.value) + 75}px`

                    } else {
                        x2 = Number(event.target.value)
                        x = x2 - x1;
                        inputParent.style.left = `${Number(event.target.value)}px`
                    }
                }
                if (event.target.id === "Y2" || event.target.id === "Y1") {
                    if (event.target.id === "Y1") {
                        y1 = Number(event.target.value)
                        y = y2 - y1;
                        inputParent.style.top = `${Number(event.target.value)}px`
                        getLine.style.top = `${Number(event.target.value) + 75}px`

                    } else {
                        y2 = Number(event.target.value)
                        y = y2 - y1;
                        x = x2 - x1;
                        inputParent.style.top = `${Number(event.target.value) - 75}px`
                    }
                }
                getLineInput.setAttribute('value', width.split('p')[0].slice(0, width.indexOf('.')))
                getLine.style.width = `${lineSize(x, y)}px`
                getLine.style.transform = `rotate(${formulaTan(x, y)}rad)`

            } else {
                let inputValue = getCircle2.querySelectorAll('input');
                getLine.style.width = `${Number(event.target.value)}px`
                y2 = Math.trunc(circle2Top(x, y) + y1);
                x2 = Math.trunc(circle2Left(x, y) + x1);
                inputValue[0].setAttribute("value", x2 );
                inputValue[1].setAttribute("value", y2 );
                getCircle2.style.top = `${circle2Top(x, y)}px`
                getCircle2.style.left = `${circle2Left(x, y)}px`
            }

        });
    })

    // remove ghost image when dragging an element

    getCircle2.addEventListener("dragstart", (e) => {
        beingDragged = e.target;
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);
    });

    getElement.addEventListener("dragstart", (e) => {
        beingDragged = e.target;
        var img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
        e.dataTransfer.setDragImage(img, 0, 0);
    });



});