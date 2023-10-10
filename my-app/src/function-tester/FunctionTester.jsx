import { ShowFunction } from "./func.jsx";
import { FixedTests } from "./fixtests.jsx";
import { CustomTests } from "./customtests.jsx";

export function FunctionTester({ fn, input, output, tests, onFinish }) {
  return (
    <>
      <h1 class="Title">FunctionTester</h1>
      <ShowFunction fn={fn}/>
      <FixedTests tests={tests} fn={fn}/>
      <CustomTests fn={fn} input={input} output={output}/>
      <button className="ok-button"
        onClick={() =>
          onFinish({
            givenTests: [],
            testResult: { achieved: 100, all: 100 },
            customTests: [],
          })
        }
      >
        OK
      </button>
    </>
  );
}
