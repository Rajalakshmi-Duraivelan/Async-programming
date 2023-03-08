async function getQuotes(){
    ele=document.getElementById('pquote');
    ele.style.display="none";
    let url="https://api.goprogram.ai/inspiration"
    let x = await fetch(url);
    let quote = await x.json();
    ele.style.display="block";
    ele.innerText=`"${quote.quote}" by ${quote.author}`;
}