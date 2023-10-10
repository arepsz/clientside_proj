import { useState } from 'react';

export function TestPage({test, fn, input, output, customTests, setCustomTests}) {

    const [name, setName] = useState("");
    const [types, setTypes] = useState([]);
    const [opened, setOpened] = useState(true);

    const getAllInputs = (n) => {
        let copy = types
        if(typeof n === "object"){
            if(Array.isArray(n)){
                copy.push("array")
                getAllInputs(n[0])
            }else{
                copy.push("object")
                getAllInputs(Object.keys(n)[0])
            }
        }
        if(typeof n === "string"){
            copy.push(input[n])
        }
        setTypes(copy)
    }

    if(opened === true) {
        for(let i = 0; i < Object.keys(input).length; i++){
            getAllInputs(Object.keys(input)[i])
        }
        setOpened(false)
    }

    const onChangeName = (event) => {
        setName(event.target.value)
    }

    const addTest = (values) => {
        let copy = [...customTests]
        copy.push(
            { name: name, testFn: (fn) => fn({ a: values[0], b: values[1] }) === 1, points: 25 }
        )
        setCustomTests(copy)
    }

    const renderElementsTest = () => {
        let inputFields = []
        for(let i = 0; i < types.length; i++){
            if(types[i] == "string"){
                inputFields.push(
                    <input type="text" placeholder={Object.keys(input)[i]} value={2} className="input-field"/>
                )
            }else if(types[i] == "number"){
                inputFields.push(
                    <input type="number" placeholder={Object.keys(input)[i]} value={2} className="input-field"/>
                )
            }
        }
        return (
            <div className="custom-test-inputs">
                <input type="text" placeholder='Name' value={test.name} className="input-field"/>
                {inputFields}
            </div>
            
        )
    }

    const renderElementsNoTest = () => {
        let inputFields = []
        let values = []
        for(let i = 0; i < types.length; i++){
            if(types[i] == "string"){
                inputFields.push(
                    <input type="text" placeholder={Object.keys(input)[i]} onChange={(event) => values.push(event.target.value)} className="input-field"/>
                )
            }else if(types[i] == "number"){
                inputFields.push(
                    <input type="number" placeholder={Object.keys(input)[i]} onChange={(event) => values.push(event.target.value)} className="input-field"/>
                )
            }
        }
        return (
            <div className="custom-test-inputs">
                <input type="text" placeholder='Name' value={test.name} onChange={onChangeName} className="input-field"/>
                {inputFields}
                <button className="button-add" onClick={() => addTest(values)}>Add</button>
            </div>
            
        )
    }

    return (
        <div className="custom-ui-main">
            {test === "" ? renderElementsNoTest() : renderElementsTest()}
            <div></div>
        </div>
    )
}