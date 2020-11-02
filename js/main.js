let temp_id_div_box = null; //Глобальная временная переменная ID выбранного блока бокс.

//Функция нажатия кнопок меню.
const select = (id_div_box) => {

    let div_menu = document.getElementById("content");
    let nav = document.getElementById("nav");
    let footer = document.getElementById("footer")
    if (id_div_box.style.display === "none") {
        id_div_box.style.display = "block";
    }

    temp_id_div_box = id_div_box;

    div_menu.remove();
    nav.remove();
    footer.remove();

    // Функция добавления кнопки принт///////////////////////////////////
    const create = (htmlStr) => {
        let frag = document.createDocumentFragment(),
            temp = document.createElement('button');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }

    // let btn = create('<button id="btnPrintSave" class="noPrint" onclick="window.print()">Print/Save to PDF</button> <button id="btnBack" class="noPrint" onclick="location.reload()">Back</button>');
    let btn = create(`
    <img src="./img/pdficon.png" id="btnPrintSave" class="noPrint" onclick="window.print()" /> 
    <img src="./img/backbutton.png" id="btnBack" class="noPrint" onclick="location.reload()" />
    `);


    id_div_box.insertBefore(btn, id_div_box.childNodes[length - 1]);
    // id_div_box.insertBefore(btnBack, id_div_box.childNodes[length - 1]);
    /////////////////////////////////////////////////////////////////////

    if (id_div_box.id !== "Status" && id_div_box.id !== "Status_Pro_32") {

        let table = id_div_box.querySelectorAll("table");

        for (let i = 0; i <= table.length - 1; i++) {
            if (table[i].className !== "noPrint") {
                table[i].rows[0].cells[0].innerHTML = "BOX " + (i + 1) + "/" + table.length;

                for (let j = 1; j <= table[i].rows.length - 1; j++) {
                    table[i].rows[j].cells[0].innerHTML = j;
                }
            }
        }
    }

}

//Функция удаления бокса.
const DeleteBox = (btn) => {
    // console.log(btn);
    let box = btn.parentNode.parentNode.parentNode.parentNode; //Переменная целого бокса.
    let RowsBox = btn.parentNode.parentNode.parentNode.getElementsByTagName("tr"); //Переменная массива строк бокса.
    // if (btn.className == "btnBox") {
    // }

    if (btn.value == "Back") {
        btn.value = "Delete";
        btn.style.backgroundImage = "url('./img/delete-forever.png')";
        box.style.opacity = "1";
        box.className = "printed";
    } else {
        btn.value = "Back";
        btn.style.backgroundImage = "url('./img/backIcon.jpg')";
        box.style.opacity = "0.5";
        box.className = "noPrint";
    }


    let allTables = temp_id_div_box.getElementsByTagName("table"); //Переменная массива всех боксов.
    let tables = temp_id_div_box.querySelectorAll(".printed"); //Переменная массива всех видимых боксов.

    for (let i = 0; i < tables.length; i++) {
        tables[i].rows[0].cells[0].innerHTML = "BOX " + (i + 1) + "/" + tables.length;
    }

    // Цикл востановления бокса.
    for (let i = 0; i < RowsBox.length; i++) {
        if (i == 0) { continue; }

        RowsBox[i].cells[0].innerHTML = i;

        if (RowsBox[i].cells.length == 5) {
            RowsBox[i].cells[4].style.visibility = "";
            RowsBox[i].cells[4].firstElementChild.value = "Delete";
        }
    }

    // Цикл удаления бокса.
    for (let i = 0; i < allTables.length; i++) {
        if (allTables[i].className == "noPrint") {
            allTables[i].rows[0].cells[0].innerHTML = "BOX #/#";

            for (let j = 0; j < allTables[i].rows.length; j++) {
                if (j == 0) { continue; }

                allTables[i].rows[j].cells[0].innerHTML = "#";

                if (allTables[i].rows[j].cells.length == 5) {
                    allTables[i].rows[j].cells[4].style.visibility = "hidden";
                    allTables[i].rows[j].style.opacity = "";
                    allTables[i].rows[j].className = "";
                }
            }
        }
    }
}

//Функция удаления строки в боксе.
const DeleteRow = (btn) => {
    let row = btn.parentNode.parentNode; //tr
    let RowsInBox = row.parentNode.getElementsByTagName("tr"); // Массив строк бокса.
    // if (btn.className == "btnRow") {
    // }

    if (btn.value == "Back") {
        btn.value = "Delete";
        btn.style.backgroundImage = "url('./img/delete-forever.png')";
        row.style.opacity = "";
        row.className = "";
    } else {
        btn.value = "Back";
        btn.style.backgroundImage = "url('./img/backIcon.jpg')";
        row.style.opacity = "0.5";
        row.className = "noPrint";
    }

    // Цикл определения строк.
    let temp = 0;
    for (let i = 0; i < RowsInBox.length; i++) {
        if (i == 0) { continue; }

        if (RowsInBox[i].className == "noPrint") {
            RowsInBox[i].firstElementChild.innerHTML = "#";
            temp++;
            continue;
        }
        RowsInBox[i].firstElementChild.innerHTML = i - temp;
    }
}


//Функция диапозона ввода в инпуты
const handleChange = (input) => {
    if (parseInt(input.value) >= 0) return;
    else input.value = '';
}

//Функция подсчёта литража краски
const total = (input) => {

    let td = input.parentNode.parentNode.querySelectorAll('td'); //Массив td
    let L = input.value * 5;
    if (parseInt(input.value) >= 0) {
        td[3].childNodes[1].data = "Total: " + L + "L";
    } else {
        input.value = '';
        td[3].childNodes[1].data = '';
    }

    console.log(td[3].childNodes[1].data);
}

// Функция подсчёта скелинга
const CalcScale = () => {
    let def = document.getElementById('DefScale');
    let num = document.getElementById('num');
    let newScale = document.getElementById('newScale');

    let result = (parseFloat(def.value) * (1500 - num.value)) / 1500;

    newScale.innerText = result.toFixed(3);

}