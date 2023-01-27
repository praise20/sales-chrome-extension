let myLeads= [];
const inputBtn= document.getElementById("input-btn");
const inputEl= document.getElementById("input-el");
const ulEl= document.getElementById("ul-el");
const deleteBtn= document.getElementById("delete-btn");
const tabBtn= document.getElementById("tab-btn");

const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if(leadsFromLocalStorage){
    myLeads= leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs);
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
     }); 
})


function render(leads){
    let listItems= "";
    for(i=0; i<leads.length; i++){
        // listItems += "<li><a target= '_blank' href= '"+ myLeads[i] +"' >" + myLeads[i] + "</a></li>";
        listItems += `
            <li>
                <a target= '_blank' href= '${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`
   }
   ulEl.innerHTML= listItems;
}


deleteBtn.addEventListener("click", function(){
    localStorage.clear;
    myLeads= [];
    render(myLeads);
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value= "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads);

    console.log(localStorage.getItem("myLeads"))
})

function renderLeads(){
    let listItems= "";
    for(i=0; i<myLeads.length; i++){
        // listItems += "<li><a target= '_blank' href= '"+ myLeads[i] +"' >" + myLeads[i] + "</a></li>";
        listItems += `
            <li>
                <a target= '_blank' href= '${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>`;
   }
   ulEl.innerHTML= listItems;
}
        
