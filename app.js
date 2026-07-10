const PRICE = 5000;

let count = Number(localStorage.getItem("count")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

const money = document.getElementById("money");
const countText = document.getElementById("count");
const historyBox = document.getElementById("history");

function update() {
    money.innerText = (count * PRICE).toLocaleString("vi-VN") + " đ";
    countText.innerText = count + " lần";

    historyBox.innerHTML = "";

    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <b>${item.type}</b>
            ${item.time}
            <span style="float:right">
            ${(item.total).toLocaleString("vi-VN")} đ
            </span>
        `;
        historyBox.appendChild(div);
    });

    localStorage.setItem("count", count);
    localStorage.setItem("history", JSON.stringify(history));
}

function add(type){

    if(type==="plus"){
        count++;
    }else{
        if(count==0) return;
        count--;
    }

    history.unshift({
        type:type==="plus" ? "+5.000" : "-5.000",
        total:count*PRICE,
        time:new Date().toLocaleString("vi-VN")
    });

    if(history.length>100){
        history.pop();
    }

    if(navigator.vibrate){
        navigator.vibrate(20);
    }

    update();
}

document.getElementById("plus").onclick=()=>{
    add("plus");
}

document.getElementById("minus").onclick=()=>{
    add("minus");
}

document.getElementById("reset").onclick=()=>{

    if(confirm("Xóa toàn bộ dữ liệu?")){

        count=0;
        history=[];

        update();

    }

}

document.getElementById("export").onclick=()=>{

    let csv="Thời gian,Thao tác,Tổng tiền\n";

    history.forEach(i=>{

        csv+=`${i.time},${i.type},${i.total}\n`;

    });

    const blob=new Blob([csv],{type:"text/csv"});

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="lich-su.csv";

    a.click();

}

update();
