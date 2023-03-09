
// let ele = document.getElementById('submit')
// ele.addEventListener('click',myfn)
let apiKey='4db3bde258164528a81c593a3fc23ec4';
let restUrl= `https://restcountries.com/v3.1/all?fields=cca2,name`
let day='', month='',year ='';
function getDate() {
    let cont = document.getElementById('details');
    cont.style.display = 'none'
    let x = document.getElementById('holiday').value;
    if(x.length===0){
        alert('Select date')
    }
    else {

        let date = x.split('-');
        year = date[0], month = date[1], day = date[2];
        console.log(year, month, day);
        let cc = document.getElementById('CC').value.substring(0, 2);
        console.log(cc);
        let holidayUrl = `https://holidays.abstractapi.com/v1/?api_key=${apiKey}&country=${cc}&year=${year}&month=${month}&day=${day}`
        let out = checkHoliday(holidayUrl);
        console.log(out, out.length);
    }
}

async function getCountryCodes(restUrl){
    let v = await fetch(restUrl)
    let res = await v.json();    
    console.log(res,res[2].name.official);
    var x = document.getElementById("CC");
    for(i=0;i<res.length;i++){
        var option = document.createElement("option");
        option.text = `${res[i].cca2} - ${res[i].name.common}`;
        x.add(option);
    }
}
getCountryCodes(restUrl);

async function checkHoliday(holidayUrl){
    let v = await fetch(holidayUrl);
    let res = await v.json();
    let cont = document.getElementById('details');
    if(res.length > 0){
        cont.style.display='block';
        cont.innerHTML = `<br><br><center><div class="result">
        Location : ${res[0].location}<br>
        Date : ${res[0].date}<br>
        Weekday : ${res[0].week_day}<br>
        Holiday : ${res[0].name}<br>
        Holiday Type : ${res[0].type}<br>
        </div></center>`
    }
    else{
        cont.style.display='block';
        cont.innerHTML = `<p><h3>No Holiday on selected date!!</h3></p>`
    }
    return res;
}