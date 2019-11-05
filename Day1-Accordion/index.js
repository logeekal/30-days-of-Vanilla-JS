let accHeader = document.getElementsByClassName('acc-header');

console.log(accHeader)

function toggleHeight(event){
  // console.log(event.target);
  // console.log(nextElement)
 
  let nextElement = this.nextElementSibling
  if(nextElement.classList.contains('hidden')){
    console.log('un-hiding now.')
    // nextElement.style.visibility = 'visible';
    // nextElement.style.height = '90px';
    // nextElement.style.display = 'block'
    nextElement.classList.remove('hidden')
  }else{
    console.log('hiding now.')
    // nextElement.style.visibility = 'hidden';
    // nextElement.style.height = 0;
    // nextElement.style.display = 'none'
    nextElement.classList.add('hidden');
    console.log(nextElement.clientHeight);
  }  
   console.log(this.nextElementSibling.clientHeight);
  console.log(nextElement.classList);

}

for (item of accHeader){
  item.addEventListener('click', toggleHeight, false);
}


