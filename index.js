var histArr = [];
let present = false;

async function getData(){
    let word = document.getElementById("searchInput").value;
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    let mainDiv = document.querySelector(".meaningCard");
    mainDiv.textContent = "Meaning:  " + data[0].meanings[0].definitions[0].definition;

    let dataGet = JSON.parse('[' + localStorage.getItem("history") + ']');
    dataGet.map((el)=>{
if(el.meaning === data[0].meanings[0].definitions[0].definition){
    present = true;
}
    });

if(!present){

    let obj = {};
    obj.id = histArr.length;
    obj.word = word;
    obj.meaning = data[0].meanings[0].definitions[0].definition;

    histArr.push(JSON.stringify(obj));
    localStorage.setItem("history",histArr);
    present = false;
}

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
        btn.innerHTML = `<i class="fa fa-trash-o" style="font-size:24px"></i>`;
        btn.className = "theBtn";
        div.className = "card";
        p1.className = "title";
        p2.className = "description";

        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(btn);

        document.querySelector(".historyCards").appendChild(div);

        document.querySelector(".theBtn").addEventListener("click",()=>{
            let theData = JSON.parse('[' + localStorage.getItem("history") + ']');
            histArr = [];
            if(theData.length == 1){
                document.querySelector(".historyCards").textContent = "";
                localStorage.setItem("history",histArr);
            }else{
            document.querySelector(".historyCards").textContent = "";
            for(var i = 0; i<theData.length; i++){
                if(i !== el.id){
                    histArr.push(JSON.stringify(theData[i]));
                }
            }
            localStorage.setItem("history",histArr);
            history();
        }
        })
    })
       
    
}
history();

