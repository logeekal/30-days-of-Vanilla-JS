
var inputTarget = document.getElementById('main_text');

var mainPage = document.getElementById('root');

let initialstate = {
    items: [],
    currentItem: '',
    events: {
        updateInput: 'updateInput'
    },
    target:{}
};


let { state, setState } = createState(initialstate);
console.log(state);




const INDEX_PAGE = (thisState=state.state) => {
    return `
    <div>
        <p> Text Managed :  ${thisState.currentItem} </p>
        <input id="main_text" type='text' name='text' value="${thisState.currentItem}" />
    </div>

`
}


function updateInput(event){
    console.log('update Event fired.');
    console.log(`${event} '\n'  Selection start at  : ${event.target.selectionStart}` );
    
    setState({
        ...state.state,
        currentItem: event.target.value,
        target: event.target
    })
}




function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}





function reGeneratePage(){
    console.log('stateUpdate Event fired.')
    mainPage.innerHTML = INDEX_PAGE();
    console.log(`Now focusing on  `);
    console.log(typeof state.state.target)
    document.getElementById('main_text').addEventListener('keyup', updateInput);
    let element = state.state.target;
    document.getElementById(element.id).setSelectionRange(element.selectionStart, element.selectionEnd)

    document.getElementById(element.id).focus(); 
    
}


window.addEventListener('stateUpdate', reGeneratePage);


reGeneratePage()

