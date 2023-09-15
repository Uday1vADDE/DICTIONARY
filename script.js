const form=document.querySelector('form');
const resultDiv=document.querySelector('.result');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);

});
const getWordInfo=async (word)=>{
    try {
        
    

    resultDiv.innerHTML='Loading data........';
    const response =await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data=await response.json();
    console.log(data);
    let d=data[0].meanings[0].definitions[0];
    resultDiv.innerHTML=`
      <h2><strong>Word:</strong>${data[0].word}</h2>
      <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
      <p><strong>Meaning:</strong>${d.definition===undefined ? "Not Found":d.definition}</p>
      <p><strong>Example:</strong>${d.example===undefined ? "Not Found":d.example}</p>
    `;
    resultDiv.innerHTML+=`
    <p><Strong>Synonyms:</strong></p>
      
    `;
    
    
    if(d.synonyms.length===0){
        resultDiv.innerHTML+=`<span> Not Found </span>`;
    }
    else{
    for(let i=0;i<d.synonyms.length;i++){
        resultDiv.innerHTML+=`<li>${d.synonyms[i]}</li>`
           }
         }
    resultDiv.innerHTML+=`
    
      <p><Strong>Antonyms:</strong></p>
    `;
    if(d.antonyms.length===0){
        resultDiv.innerHTML+=`<span> Not Found </span>`;
    }
    else{
    for(let i=0;i<d.antonyms.length;i++){
        resultDiv.innerHTML+=`<li>${d.antonyms[i]}</li>`
           }
         }
    resultDiv.innerHTML+=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
    console.log(data);
} catch (error) {
      resultDiv.innerHTML=`<p>Sorry,The word couldn't be found</p>`;
}
    
    
    
}