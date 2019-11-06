function StateManager(initialState) {
    this.state =  initialState
    //
    const setStateInternal = (newState) => {
        console.log(`In the setting. Setting state now with value ${JSON.stringify(newState)}.`)
        this.state = newState;
        console.log(`New state is ${JSON.stringify(this.state)}`);
    }

    this.setState = new Proxy(setStateInternal, {
        apply: function(target, thisArgs, argumentList){
            console.log(arguments)
            console.log('Now setting the state');
            target(...argumentList);
            let eventFired  = dispatchEvent(stateUpdated);
            console.log(`Event Fired : ${eventFired}`);
            
        }
    });
        
    
}


function createState (initialState) {
    console.log('initializing state')
    let tempState = new StateManager(initialState);

    return tempState;
};



let stateUpdated = new Event('stateUpdate');