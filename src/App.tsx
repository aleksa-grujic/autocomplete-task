import './App.css'
import {Autocomplete} from "./components";

function App() {
    return (
        <div className={'app'}>
            <h1>Autocomplete component</h1>
            <Autocomplete debounceTime={300} placeholder="Type here to search the products..."/>
        </div>
    )
}

export default App
