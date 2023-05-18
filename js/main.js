let temp_id_div_box = null; //Глобальная временная переменная ID выбранного блока бокс.

//Функция нажатия кнопок меню.
const select = (id_div_box) => {

    // addTable(id_div_box);
    addColCheckList(id_div_box);

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
    <img src="./img/pdficon.png" id="btnPrintSave" type="button" class="noPrint" onclick="window.print()" /> 
    <img src="./img/backbutton.png" id="btnBack" type="button" class="noPrint" onclick="location.reload()" />
    <button id="btnAddBox" type="button" class="noPrint btn btn-info shadow" onclick="addTable()">Add BOX</button>
    
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

    } else {
        document.getElementById('btnAddBox').remove();
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

    // for (let i = 0; i < tables.length; i++) {
    //     tables[i].rows[0].cells[0].innerHTML = "BOX " + (i + 1) + "/" + tables.length;
    // }

    recalculation();

    // Цикл востановления бокса.
    for (let i = 0; i < RowsBox.length; i++) {
        if (i == 0) {
            continue;
        }

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
                if (j == 0) {
                    continue;
                }

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
    // let temp = 0;
    // for (let i = 0; i < RowsInBox.length; i++) {
    //     if (i == 0) {
    //         continue;
    //     }

    //     if (RowsInBox[i].className == "noPrint") {
    //         RowsInBox[i].firstElementChild.innerHTML = "#";
    //         temp++;
    //         continue;
    //     }
    //     RowsInBox[i].firstElementChild.innerHTML = i - temp;
    // }
    recalcRows(RowsInBox);
}

const recalcRows = (RowsInBox) => {

    let temp = 0;
    for (let i = 0; i < RowsInBox.length; i++) {
        if (i == 0) {
            continue;
        }

        if (RowsInBox[i].className == "noPrint") {
            RowsInBox[i].firstElementChild.innerHTML = "#";
            temp++;
            continue;
        }
        RowsInBox[i].firstElementChild.innerHTML = i - temp;
    }
}

const counterQuantityCells = (QuantitySells) => {

    let counter = 1;
    for (let i = 0; i < QuantitySells.length; i++) {
        QuantitySells[i].innerHTML = `${counter++}/${QuantitySells.length}`;
    }


}

//Функция добавления бокса аир шафт
const AddAirShaft = (btn) => {
    let box = btn.parentNode.parentNode.parentNode.parentNode;
    // let Quantity = box.childNodes[1].childNodes[2].childNodes[7].innerHTML; //Ячейка количество аир шафтов
    let QuantitySells;
    let boxs;

    let el = document.createElement('table');
    let attrFrome = document.createAttribute('frome');
    attrFrome.value = 'boxs';
    el.setAttributeNode(attrFrome);
    el.className = 'printed';
    if (btn.className == 'btnAddAirShaft1-6') {
        el.innerHTML = `
            <tr headRow="bold">
                <td> </td>
                <td> Description </td>
                <td> P/N </td>
                <td> Quantity </td>
                <td> Check List </td>
                <td class="noPrint">
                    <input type="button" class="btnAddAirShaft1-6" value="+" onclick="AddAirShaft(this)" />
                    <input type="button" class="btnRemoveAirShaft1-6" value=" - " onclick="RemoveAirShaft(this)" />
                </td>
            </tr>
            <tr>
                <td> 1 </td>
                <td> Air Shaft 1.6m </td>
                <td> 11101693 </td>
                <td class="airShaft1-6"> </td>
                <td> <input type="checkbox"> </td>
            </tr>    
  `;

    } else if (btn.className == 'btnAddAirShaft3-2') {
        el.innerHTML = `
            <tr headRow="bold">
                <td> </td>
                <td> Description </td>
                <td> P/N </td>
                <td> Quantity </td>
                <td> Check List </td>
                <td class="noPrint">
                    <input type="button" class="btnAddAirShaft3-2" value="+" onclick="AddAirShaft(this)" />
                    <input type="button" class="btnRemoveAirShaft3-2" value=" - " onclick="RemoveAirShaft(this)" />
                </td>
            </tr>
            <tr>
                <td> 1 </td>
                <td> Air Shaft 3.2m </td>
                <td> 11101540 </td>
                <td class="airShaft3-2"> </td>
                <td> <input type="checkbox"> </td>
            </tr>    
  `;

    } else if (btn.className == 'btnAddAirShaft5-2') {
        el.innerHTML = `
            <tr headRow="bold">
                <td> </td>
                <td> Description </td>
                <td> P/N </td>
                <td> Quantity </td>
                <td> Check List </td>
                <td class="noPrint">
                    <input type="button" class="btnAddAirShaft5-2" value="+" onclick="AddAirShaft(this)" />
                    <input type="button" class="btnRemoveAirShaft5-2" value=" - " onclick="RemoveAirShaft(this)" />
                </td>
            </tr>
            <tr>
                <td> 1 </td>
                <td> Air Shaft 5.2m </td>
                <td> 11101772 </td>
                <td class="airShaft5-2"> </td>
                <td> <input type="checkbox"> </td>
            </tr>    
  `;

    } else if (btn.className == 'btnAddAssyMotor') {
        el.innerHTML = `
            <tr headRow="bold">
                <td> </td>
                <td> Description </td>
                <td> P/N </td>
                <td> Quantity </td>
                <td> Check List </td>
                <td class="noPrint">
                    <input type="button" class="btnAddAssyMotor" value="+" onclick="AddAirShaft(this)" />
                    <input type="button" class="btnRemoveAssyMotor" value=" - " onclick="RemoveAirShaft(this)" />
                </td>
            </tr>
            <tr>
                <td> 1 </td>
                <td> ASSY SUPPORT MOTOR AIR SHAFT </td>
                <td> 11102259 </td>
                <td class="airShaftAssyMotor"> </td>
                <td> <input type="checkbox"> </td>
            </tr>    
  `;
    } else if (btn.className == 'btnAddAirShaftPRO32') {
        el.innerHTML = `
            <tr headRow="bold">
                <td> </td>
                <td> Description </td>
                <td> P/N </td>
                <td> Quantity </td>
                <td> Check List </td>
                <td class="noPrint">
                    <input type="button" class="btnAddAirShaftPRO32" value="+" onclick="AddAirShaft(this)" />
                    <input type="button" class="btnRemoveAirShaftPRO32" value=" - " onclick="RemoveAirShaft(this)" />
                </td>
            </tr>
            <tr>
                <td> 1 </td>
                <td> SHAFT LOAD-UNLOAD EXPANDING 1.6M CORE 3" PNEUMATIC </td>
                <td> 77700795 </td>
                <td class="airShaftPRO32"> </td>
                <td> <input type="checkbox"> </td>
            </tr>    
  `;
    }

    const insertAfter = (referenceNode, newNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        boxs = temp_id_div_box.querySelectorAll('.printed');

        switch (btn.className) {
            case 'btnAddAirShaft1-6':
                QuantitySells = temp_id_div_box.querySelectorAll('.airShaft1-6');
                break;
            case 'btnAddAirShaft3-2':
                QuantitySells = temp_id_div_box.querySelectorAll('.airShaft3-2');
                break;
            case 'btnAddAirShaft5-2':
                QuantitySells = temp_id_div_box.querySelectorAll('.airShaft5-2');
                break;
            case 'btnAddAssyMotor':
                QuantitySells = temp_id_div_box.querySelectorAll('.airShaftAssyMotor');
                break;
            case 'btnAddAirShaftPRO32':
                QuantitySells = temp_id_div_box.querySelectorAll('.airShaftPRO32');
                break;
        }
    }


    insertAfter(box, el);
    counterQuantityCells(QuantitySells);

    //Функция подсчёта видемых боксов
    // for (let i = 0; i < boxs.length; i++) {
    //     boxs[i].rows[0].cells[0].innerHTML = "BOX " + (i + 1) + "/" + boxs.length;
    // }
    recalculation();

}

//Функция удаление аир шафта
const RemoveAirShaft = (btn) => {
    let box = btn.parentNode.parentNode.parentNode.parentNode;
    let QuantitySells;

    box.remove();

    switch (btn.className) {
        case 'btnRemoveAirShaft1-6':
            QuantitySells = temp_id_div_box.querySelectorAll('.airShaft1-6');
            break;
        case 'btnRemoveAirShaft3-2':
            QuantitySells = temp_id_div_box.querySelectorAll('.airShaft3-2');
            break;
        case 'btnRemoveAirShaft5-2':
            QuantitySells = temp_id_div_box.querySelectorAll('.airShaft5-2');
            break;
        case 'btnRemoveAssyMotor':
            QuantitySells = temp_id_div_box.querySelectorAll('.airShaftAssyMotor');
            break;
        case 'btnRemoveAirShaftPRO32':
            QuantitySells = temp_id_div_box.querySelectorAll('.AirShaftPRO32');
            break;
    }

    counterQuantityCells(QuantitySells);

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

//функция добавления колонки check list
const addColCheckList = (box) => {
    if (box.id !== "Status" && box.id !== "Status_Pro_32") {

        // let RowsBox = box.getElementsByTagName("tr"); //Переменная массива строк бокса.
        let tbl = box.getElementsByTagName("table"); // Переменная всех таблиц в боксе.

        for (let i = 0; i < tbl.length; i++) { //Проходимся по всем таблицам
            for (let j = 0; j < tbl[i].childNodes[1].children.length; j++) { //В каждой таблице в теге <tbody> проходим по всем строкам
                if (j == 0) { //если строка в таблице первая то:
                    tbl[i].childNodes[1].children[0].insertCell(4).innerHTML = `Check List`; //добавляем заголовок
                } else {
                    tbl[i].childNodes[1].children[j].insertCell(4).innerHTML = `<input type="checkbox">`; //иначе добавляем чекбокс
                }
            }
        }
    }

}

//Функция кастомного бокса
const addTable = () => {
    box = temp_id_div_box;
    if (box.id !== "Status" && box.id !== "Status_Pro_32") {
        let arrTables = box.getElementsByTagName('table');
        let lastTable = arrTables[arrTables.length - 1];

        let table = document.createElement('table');
        let attrFrome = document.createAttribute('frome');
        attrFrome.value = 'boxs';
        table.setAttributeNode(attrFrome);
        table.className = 'printed';
        table.innerHTML = `
                       <tr headRow="bold">
                           <td></td>
                           <td> Description </td>
                           <td> P/N </td>
                           <td> Quantity </td>
                           <td> Check List </td>
                           <td class="noPrint"><input type="button" class="btnBox" value="Delete" onclick="DeleteBox(this)" /></td>
                       </tr>
                       <tr>
                           <td> 1 </td>
                           <td> <span class="inputCastomBox" role="textbox" contenteditable></span> </td>
                           <td> <span class="inputCastomBox" role="textbox" contenteditable></span> </td>
                           <td> <span class="inputCastomBox" role="textbox" contenteditable></span> </td>
                           <td> <input type="checkbox"> </td>
                           <td class="noPrint">
                                <input type="button" class="btnAddLine" value="+" onclick="AddLine(this)" />
                                <input type="button" class="btnRow" value="Delete" onclick="DeleteRow(this)" />
                           </td>
                       </tr>
                         `;

        lastTable.parentNode.insertBefore(table, lastTable.nextSibling);

        recalculation();

    }
}

const AddLine = (btn) => {
    const line = btn.parentNode.parentNode;

    let tr = document.createElement('tr');
    tr.innerHTML = `
                           <td> </td>
                           <td> <span class="inputCastomBox" role="textbox" contenteditable></span> </td>
                           <td> <span class="inputCastomBox" role="textbox" contenteditable></span> </td>
                           <td> <span class="inputCastomBox" role="textbox" contenteditable></span> </td>
                           <td> <input type="checkbox"> </td>
                           <td class="noPrint">
                                <input type="button" class="btnRow" value="Delete" onclick="DeleteRow(this)" />
                           </td>
    `;
    // console.log(btn.parentNode.parentNode);
    line.parentNode.insertBefore(tr, line.nextSibling);
    let RowsInBox = line.parentNode.getElementsByTagName("tr"); // Массив строк бокса.
    recalcRows(RowsInBox);

}

//Функция подсчёта видемых боксов
const recalculation = () => {
    let tables = temp_id_div_box.querySelectorAll(".printed");
    for (let i = 0; i < tables.length; i++) {
        tables[i].rows[0].cells[0].innerHTML = "BOX " + (i + 1) + "/" + tables.length;
    }

}

//Функция отоброжения названия слитера в зависимости от выбранного PN
const getSlitter = (sn) => {
    // console.log(sn)
    if (sn) {
        const slittersNames = document.querySelectorAll('.slitterName');
        // console.log(slittersNames)
        switch (sn) {
            case "10102015":
                slittersNames.forEach((name) => {
                    name.innerHTML = 'Y-SLITTER 2 BLADED VUTEK 3R+/5R+/D3R/D5R';
                });
                break;
            case "10102115":
                slittersNames.forEach((name) => {
                    name.innerHTML = 'ASSY SLITTER WITH STRIP COLLECTING';
                });
                break;
        }
    }
}


//Отображения сегодняшнего года в футере
const curentYear = new Date().getFullYear();

document.getElementById('footer').innerHTML = `
<p id="by"> 
    <a class="" href="https://www.facebook.com/lemberg.evgeny" target="_blank">
        Created by &copy;Lemberg Evgeny 2019-${curentYear} 
    </a>
    <span>V3</span>
</p>
`;