



type ListenerFn<T> = (val:T,oldVal?:T)=>void


export function createStore<T extends object>(preloadedState:T) {


  let getter_setter = {...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(preloadedState))}

  let currentListeners:ListenerFn<T>[]=[];

  let nextListeners = currentListeners;

  let currentState = preloadedState

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }


  function subscribe(listener:ListenerFn<T>) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    let isSubscribed = true

    ensureCanMutateNextListeners();
    nextListeners.push(listener);


    listener(currentState);

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }

  function getState() {
    return currentState
  }


  function dispatch(newState:Partial<T>) {
    const oldState = Object.defineProperties({...currentState},getter_setter);
    currentState = Object.defineProperties({...currentState,...newState},getter_setter);
    const listeners = currentListeners = nextListeners
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener(currentState,oldState)
    }
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}