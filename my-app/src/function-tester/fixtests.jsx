import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react';

export function FixedTests({tests, fn}) {
    
    const [opened, setOpened] = useState(true)
    const [testIcons, setTestIcons] = useState([])
    const [fixtestPoints, setFixtestPoints] = useState(0)

    if(opened === true) {
        let strings = []
        for(let i = 0; i < tests.length; i++){
            strings.push("empty")
        }
        setTestIcons(strings)
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

    const runTest = (tests, i) => {
        let changeStrings = [...testIcons]
        if(tests[i].testFn(fn) === true){
            changeStrings[i] = "check"
        }else{
            changeStrings[i] = "x"
        }
        if(tests[i].testFn(fn) === true && (testIcons[i] !== "check" && testIcons[i] !== "x")){
            setFixtestPoints(fixtestPoints + tests[i].points)
        }
        setTestIcons(changeStrings)
    }

    const runAllTests = () => {
        let changeStrings = [...testIcons]
        let points = 0
        if(fixtestPoints == 0){
            for(let i = 0; i < tests.length; i++){
                if(tests[i].testFn(fn) === true){
                    changeStrings[i] = "check"
                }else{
                    changeStrings[i] = "x"
                }
                if(tests[i].testFn(fn) === true && (testIcons[i] !== "check" && testIcons[i] !== "x")){
                    points += tests[i].points
                }
            }
            setFixtestPoints(points)
            setTestIcons(changeStrings)
        }
    }

    const renderTests = (tests) => {
        let testsContainer = [];
        for(let i = 0; i < tests.length; i++) {
            testsContainer.push(
                <div className="fixed-test-row-div">
                    <div className="fixed-test-row-name">{tests[i].name}</div>
                    <div className="fixed-test-row-icon">{renderIcon(i)}</div>
                    <div className="fixed-test-row-buttons"><button className="fixed-test-row-button" onClick={() => runTest(tests, i)}>Run test</button></div>
                    <div className="fixed-test-row-points">{testIcons[i] == "check" ? tests[i].points : "0"}</div>
                </div>
            )
        }
        return testsContainer;
    }
    
    return (
        <div className="fixed-tests-container">
            <h1 className="fixed-tests-h1">Fix tests</h1>
            <div className="fixed-tests-table-header">
                <div className="fixed-test-row-div">
                    <div className="fixed-test-row-name test">Test</div>
                    <div className="fixed-test-row-icon result">Result</div>
                    <div className="fixed-test-row-buttons action">Action</div>
                    <div className="fixed-test-row-points points">Points</div>
                </div>
                {renderTests(tests)}
                <div className="button-and-sum">
                    <button className="runall-button" onClick={() => runAllTests()}>Run all</button>
                    <div className="fix-tests-sum">Sum: {fixtestPoints}</div>
                </div>
            </div>
        </div>
    )
}