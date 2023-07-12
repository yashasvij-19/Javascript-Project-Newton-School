var histArr = [];

async function getData(){
    let word = document.getElementById("searchInput").value;
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    let mainDiv = document.querySelector(".meaningCard");
    mainDiv.textContent = "Meaning:  " + data[0].meanings[0].definitions[0].definition;
    mainDiv.style.marginLeft = "32%";
    mainDiv.style.padding = "10px";
    mainDiv.style.fontSize = "17px";
    mainDiv.style.fontWeight = "700";
    mainDiv.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
    mainDiv.style.color = "rgb(43,42,42)";
    mainDiv.style.width = "30%";


    let obj = {};
    obj.id = histArr.length;
    obj.word = word;
    obj.meaning = data[0].meanings[0].definitions[0].definition;
    histArr.push(JSON.stringify(obj));
    localStorage.setItem("history",histArr);
}

function history(){
    let theData = JSON.parse('[' + localStorage.getItem("history") + ']');
    theData.map((el)=>{
        let div = document.createElement("div");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let btn = document.createElement("button");
        p1.innerText = "word : " + el.word;
        p2.innerText = el.meaning;
        btn.innerHTML = `<i class="fa fa-trash-o" style="font-size:35px"></i>`;
        btn.style.cursor = "pointer";
        btn.style.backgroundColor = "white";
        div.style.backgroundColor = "white";
        btn.style.color = "black";
        div.style.width = "200px";
        btn.style.width = "50px";
        div.style.height = "250px";
        btn.style.height = "50px";
        div.style.margin = "10px";
        div.style.padding = "10px";
        div.style.border = "1px solid black";
        btn.className = "theBtn";
        p1.style.fontSize = "17px";
        p2.style.fontSize = "15px";
        p1.style.fontWeight = "700";
        p1.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
        p2.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
        p1.style.color = "rgb(43,42,42)";
        p2.style.color = "rgb(43,42,42)";

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(btn);

        document.querySelector(".historyCards").append(div);

        document.querySelector(".theBtn").addEventListener("click",()=>{
            histArr = [];
            let theData = JSON.parse('[' + localStorage.getItem("history") + ']');
            document.querySelector(".historyCards").textContent = "";
            for(var i = 0; i<theData.length; i++){
                if(i !== el.id){
                    histArr.push(JSON.stringify(theData[i]));
                }
            }
            localStorage.setItem("history",histArr);
            history();
        })
    })
       
    
}
history();

