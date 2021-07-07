***************JS********************

let dt = new Date();
let d = dt.getDate();
let m = dt.getMonth() + (1);
let y = dt.getFullYear() - (2000);

function GetEngineer() {
   
    document.getElementById('engineer').innerHTML = ((((d * d) + (m * m)) * 2) + y);
}

function GetNewEngineer(ver) {
    document.getElementById("newEngineer").innerHTML = ((100 + m) * (100 + m))+(d * d) + y + parseInt(ver);
  }

***************HTML body********************
<body onload="GetEngineer()">


***************Card Engineer********************
                <!-- <div class="col-sm card text-white bg-dark m-1">
                    <div class="card-header">Engineer now:</div>
                    <div class="card-body">
                        <label for="engineer">Engineer</label>
                        <h3 class="card-title h1" id="engineer"></h3>

                        <hr>

                        <label for="newEngineer">New Engineer</label>
                        <h3 class="card-title h1" id="newEngineer"> New Engineer</h3>
                        <div class="input-group input-group-md d-flex justify-content-around">
                            <div>
                                <label for="v12">12.1.x</label>
                                <input class="form-control" id="v12" type="radio" name="verFrontEnd"
                                    onclick="GetNewEngineer(this.value)" value="12">
                            </div>
                            <div>
                                <label for="v14">14.x.x</label>
                                <input class="form-control" id="v14" type="radio" name="verFrontEnd"
                                    onclick="GetNewEngineer(this.value)" value="14">
                            </div>
                        </div>
                        <hr>
                    </div>
                </div> -->