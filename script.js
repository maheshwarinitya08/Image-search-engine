let input=document.querySelector(".search-box input")
let btn=document.querySelector(".btn button")
let images=document.querySelector(".images")
let load=document.querySelector("#load")


const accessKey="aVWqoWTpyPmfEcXfg-llkfnxulQTlCnPVVLs_m94rMQ"
let page=1;
let keyword=""
function download(imgurl){
    fetch(imgurl).then(res=>res.blob()).then(file=>{
        let a=document.createElement("a");
        a.href=URL.createObjectURL(file);
        a.download=new Date().getTime();
        a.click();
    }).catch(()=>alert("failed download"))
}

async function getResponse(){
     keyword=input.value;
     let url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
     let response=await fetch(url);
     let data=await response.json();
     let results=data.results;
     console.log(results)
     if(page==1){
        images.innerHTML = '';
     }
     load.style.display="block";
    

     results.map((result)=>{
        console.log(result.urls.small)
        let li=document.createElement("li");
        li.classList.add("image");
        let html=`<img src="${result.urls.small}" alt="img" class="photo">
                <div class="details">
                    <div class="user">
                        <img src="camera.svg" alt="user">
                        <span>${result.slug}</span>
                    </div>
                    <div class="download" onclick=download('${result.urls.small}')>
                        <img src="download.svg" alt="download">
                    </div>
                </div>`
                li.innerHTML=html
                images.appendChild(li)
     });
    }
btn.addEventListener("click",()=>{
    page=1
    getResponse()
})
load.addEventListener("click",()=>{
    page++;
    getResponse()
})
input.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        page=1
        getResponse()
    }
})