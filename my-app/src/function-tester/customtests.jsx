import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { TestPage } from "./testpage.jsx";

export function CustomTests({fn, input, output}) {
    const [customTests, setCustomTests] = useState([]);
    const [opened, setOpened] = useState(true);
    const [testIcons, setTestIcons] = useState([]);
    const [customTestPoints, setCustomTestPoints] = useState(0);

    if(opened === true) {
        let strings = []
        for(let i = 0; i < customTests.length; i++){
            strings.push("empty")
        }
        let fix = { name: "CustomTest1", testFn: (fn) => fn({ a: 1, b: 0 }) === 1, points: 25 }
        let list = [fix]
        setTestIcons(strings)
        setCustomTests(list)
        setOpened(false)
    }

    const renderIcon = (i) => {
        let FAIcon;
        if(testIcons[i] === "check") {
            FAIcon = <FontAwesomeIcon icon={faCircleCheck} style={{color: "#2ec27e"}}/>
        }else if(testIcons[i] === "x") {
            FAIcon = <FontAwesomeIcon icon={faCircleXmark} style={{color: "#c01c28"}}/>
        }else{
            FAIcon = <FontAwesomeIcon icon={faCircle} />
        }
        return FAIcon;
    }

    const renderSzerk = (test) => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Regisztráció</h1>
                  <TestPage test={test} fn={fn} input={input} output={output} customTests={customTests} setCustomTests={setCustomTests}/>
                  <button onClick={onClose} className="custom-ui-button">Vissza</button>
                </div>
              );
            }
        });
    }

    const renderUj = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Add new test</h1>
                  <TestPage test={""} fn={fn} input={input} output={output} customTests={customTests} setCustomTests={setCustomTests}/>
                  <button onClick={onClose} className="custom-ui-button">Go back</button>
                </div>
              );
            }
        });
    }

    const runTest = (tests, i) => {
        let changeStrings = [...testIcons]
        if(tests[i].testFn(fn) === true){
            changeStrings[i] = "check"
        }else{
            changeStrings[i] = "x"
        }
        if(tests[i].testFn(fn) === true && (testIcons[i] !== "check" && testIcons[i] !== "x")){
            setCustomTestPoints(customTestPoints + tests[i].points)
        }
        setTestIcons(changeStrings)
    }

    const runAllTests = () => {
        let changeStrings = [...testIcons]
        let points = 0
        if(customTestPoints == 0){
            for(let i = 0; i < customTests.length; i++){
                if(customTests[i].testFn(fn) === true){
                    changeStrings[i] = "check"
                }else{
                    changeStrings[i] = "x"
                }
                if(customTests[i].testFn(fn) === true && (testIcons[i] !== "check" && testIcons[i] !== "x")){
                    points += customTests[i].points
                }
            }
            setCustomTestPoints(points)
            setTestIcons(changeStrings)
        }
    }

    const deleteTest = (i) => {
        let copy = []
        for(let j = 0; j < customTests.length; j++){
            if(customTests[j] !== customTests[i]){
                copy.push(customTests[j])
            }
        }
        setCustomTests(copy)
    }

    const renderTests = () => {
        let testsContainer = [];
        for(let i = 0; i < customTests.length; i++) {
            testsContainer.push(
                <div className="fixed-test-row-div">
                    <div className="custom-test-row-name">{customTests[i].name}</div>
                    <div className="custom-test-row-icon">{renderIcon(i)}</div>
                    <div className="custom-test-row-buttons">
                        <button className="custom-test-row-button" onClick={() => runTest(customTests, i)}>Run test</button>
                        <button className="custom-test-row-button blue" onClick={() => renderSzerk(customTests[i])}>Edit</button>
                        <button className="custom-test-row-button red" onClick={() => deleteTest(i)}>Delete</button>
                    </div>
                    <div className="custom-test-row-points">{testIcons[i] == "check" ? customTests[i].points : "0"}</div>
                </div>
            )
        }
        return testsContainer;
    }

    return(
        <div className="fixed-tests-container">
            <h1 className="fixed-tests-h1">Custom tests</h1>
            <div className="fixed-tests-table-header">
                <div className="fixed-test-row-div">
                    <div className="fixed-test-row-name test">Test</div>
                    <div className="fixed-test-row-icon result">Result</div>
                    <div className="fixed-test-row-buttons action">Action</div>
                    <div className="fixed-test-row-points points">Points</div>
                </div>
                {renderTests(customTests)}
                <div className="button-and-sum">
                    <button className="new-button blue" onClick={() => renderUj()}>Add test</button>
                    <button className="runall-button-custom" onClick={() => runAllTests()}>Run all</button>
                    <div className="fix-tests-sum">Sum: {customTestPoints}</div>
                </div>
            </div>
        </div>
    )
}