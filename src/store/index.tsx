import {
    combineReducers,
    configureStore,
    createSlice,
    createStore,
} from "@reduxjs/toolkit";
import _, { cloneDeep } from "lodash";
import { evaluate } from "mathjs";
import {
    CellClassObjectType,
    MarkdownPanel,
    MarkdownPanelObjectType,
    ProfileVariantEnum,
    SheetClass,
    SheetClassObjectType,
} from "../utility/Classes";

/**
 *  determines the initial value of a calc state which can be either:
 *  - new array of SheetClassObjectType
 *  - array saved in local storage
 */
const determineInitialStateCalc = (): Array<SheetClassObjectType> => {
    const sheetRaw: null | string = localStorage.getItem("sheets");
    if (!sheetRaw) {
        const newSheetArr: Array<SheetClassObjectType> = [
            new SheetClass().getObject(),
            new SheetClass().getObject(),
            new SheetClass().getObject(),
        ];

        localStorage.setItem("sheets", JSON.stringify(newSheetArr));
        return newSheetArr;
    }

    return JSON.parse(sheetRaw) as Array<SheetClassObjectType>;
};

/**
 * @param colName name (string) at the top of the column
 * @returns column number
 */
const getColumnNumberFromColName = (colName: string): number => {
    return colName.charCodeAt(0) - 65;
};

const sheetFunctionRegex: RegExp = /([A-Za-z]+\([^)]*\))/;

/**
 * @param text containing sheet function(s)
 * @returns string with functions replaced by smaller, much more parsable expressions
 */
const parseSheetFunction = (text: string) => {
    const parenthesesAndColonRegex: RegExp = /[():]/;
    const chunks = text
        .trim()
        .split(sheetFunctionRegex)
        .filter((str) => str !== "");

    const newChunks: string[] = chunks.map((chunk) => {
        if (sheetFunctionRegex.test(chunk)) {
            const expressionParts = chunk
                .split(parenthesesAndColonRegex)
                .filter((element) => element);
            const limiters = [
                expressionParts[1]
                    .split(/([A-Z])/)
                    .filter((element) => element),
                expressionParts[2]
                    .split(/([A-Z])/)
                    .filter((element) => element),
            ];
            const numberLimiters = [
                [
                    getColumnNumberFromColName(limiters[0][0]),
                    Number(limiters[0][1]),
                ],
                [
                    getColumnNumberFromColName(limiters[1][0]),
                    Number(limiters[1][1]),
                ],
            ];

            let newText: string = "(";
            switch (expressionParts[0]) {
                case "Sum":
                    for (
                        let x = numberLimiters[0][0];
                        x <= numberLimiters[1][0];
                        x++
                    ) {
                        for (
                            let y = numberLimiters[0][1];
                            y <= numberLimiters[1][1];
                            y++
                        ) {
                            newText += `${
                                x === numberLimiters[0][0] &&
                                y === numberLimiters[0][1]
                                    ? ""
                                    : "+"
                            }${String.fromCharCode(65 + x)}${String(y)}`;
                        }
                    }

                    return newText + ")";

                case "Avg":
                    let count: number = 0;
                    newText += "(";
                    for (
                        let x = numberLimiters[0][0];
                        x <= numberLimiters[1][0];
                        x++
                    ) {
                        for (
                            let y = numberLimiters[0][1];
                            y <= numberLimiters[1][1];
                            y++
                        ) {
                            newText += `${
                                x === numberLimiters[0][0] &&
                                y === numberLimiters[0][1]
                                    ? ""
                                    : "+"
                            }${String.fromCharCode(65 + x)}${String(y)}`;
                            count++;
                        }
                    }
                    return newText + `)/${count})`;

                default:
                    return "ERR10";
            }
        }
        return chunk;
    });
    return newChunks.join("");
};

/**
 * @param text to evaluate
 * @sheet sheet to evaluate from
 * @tableIndex index of a table to evaluate from
 * @returns evaulated this.text used for display in a table
 */
const getEvaluatedText = (
    sheet: SheetClassObjectType,
    tableIndex: number,
    text: string
) => {
    let rawText = text;
    const table = _.cloneDeep(sheet.tables[tableIndex]);
    // if this.text is a mathematical expression:
    if (rawText[0] === "=") {
        // checks for functions e.g.: Avg(B1:C3), Sum(A2:B7)
        if (sheetFunctionRegex.test(rawText)) {
            rawText = parseSheetFunction(rawText);
        }
        // checks for cell identifiers, e.g.: A1, B5, D2
        const cellRegex: RegExp = /([A-Z][1-9]+)/;
        if (cellRegex.test(rawText)) {
            let _text: string = "";
            // e.g: ['=','C4','+75.7']
            const chunks: string[] = rawText
                .trim()
                .split(cellRegex)
                .filter((str) => str !== "");

            _text = chunks.reduce((prev, next): string => {
                if (cellRegex.test(next)) {
                    // split string
                    const coords = next
                        .split(/([A-Z])/)
                        .filter((str) => str !== "");

                    return (prev +=
                        table.cells[Number(coords[1]) - 1][
                            getColumnNumberFromColName(coords[0])
                        ].value || "0");
                } else {
                    return (prev += next);
                }
            });
            try {
                return evaluate(_text.substring(1));
            } catch (error) {
                return "ERROR";
            }
        } else {
            try {
                return evaluate(rawText.substring(1));
            } catch (error) {
                return "ERROR";
            }
        }
    }
    return text;
};

const calcSlice = createSlice({
    name: "calc",
    initialState: determineInitialStateCalc(),
    reducers: {
        /**
         * @description replaces whole sheet with one another
         * @param action payload is SheetClassObjectType instance
         */
        setSheet(
            state: Array<SheetClassObjectType>,
            action: { payload: SheetClassObjectType; type: string }
        ) {
            const newState = _.cloneDeep(state);

            const sheetIndex: number = newState.findIndex(
                (sht: SheetClassObjectType) => sht.id === action.payload.id
            );

            if (sheetIndex < 0) {
                console.error(
                    "ERROR: SHEET ISN'T PART OF THE STATE IN setSheet"
                );
                return;
            }
            newState[sheetIndex] = cloneDeep(action.payload);

            localStorage.setItem("sheets", JSON.stringify(newState));
            return newState;
        },

        /**
         * @description replaces given cell with a new one
         * @param action payload is CellClassObjectType instance, and a proper sheetID
         */
        setCell(
            state: Array<SheetClassObjectType>,
            action: {
                payload: { cell: CellClassObjectType; sheetID: number };
                type: string;
            }
        ) {
            const newState = _.cloneDeep(state);
            const sheetIndex: number = newState.findIndex(
                (sht: SheetClassObjectType) => sht.id === action.payload.sheetID
            );

            if (sheetIndex < 0) {
                console.error("ERROR: SHEET DOESN'T EXIST");
                return;
            }

            const tableIndex = newState[sheetIndex].tables.findIndex(
                (tab: any) => tab.id === newState[sheetIndex].mainTabID
            );

            if (tableIndex < 0) {
                console.error("ERROR: TABLE DOESN'T EXIST");
                return;
            }

            const { payload } = action;
            payload.cell.value = getEvaluatedText(
                newState[sheetIndex],
                tableIndex,
                payload.cell.text
            );
            newState[sheetIndex].tables[tableIndex].cells[payload.cell.y][
                payload.cell.x
            ] = _.cloneDeep(action.payload.cell);
            localStorage.setItem("sheets", JSON.stringify(newState));
            return newState;
        },
    },
});

const profileSlice = createSlice({
    name: "profileNumber",
    initialState: { index: 1 } as { index: number },
    reducers: {
        setProfile(state, action: { payload: number; type: string }) {
            const { payload } = action;
            if (payload < 1 || payload > 3) {
                console.error(`ERROR: payload: ${payload} out of bound`);
                return state;
            }

            state.index = payload;
        },
    },
});

const markdownPlacehoder: string = `
# [React](https://reactjs.org/) &middot; [![GitHublicense](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npmversion](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![CircleCIStatus](https://circleci.com/gh/facebook/react.svg?style=shield)](https://circleci.com/gh/facebook/react) [![PRsWelcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

React is a JavaScript library for building user interfaces.

* **Declarative:** React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep the state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using [React Native](https://reactnative.dev/).

[Learn how to use React in your project](https://reactjs.org/docs/getting-started.html).

## Installation

React has been designed for gradual adoption from the start, and **you can use as little or as much React as you need**:

* Use [Online Playgrounds](https://reactjs.org/docs/getting-started.html#online-playgrounds) to get a taste of React.
* [Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html) as a \`<script>\` tag in one minute.
* [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html) if you're looking for a powerful JavaScript toolchain.

You can use React as a \`<script>\` tag from a [CDN](https://reactjs.org/docs/cdn-links.html), or as a \`react\` package on [npm](https://www.npmjs.com/package/react).

## Documentation

You can find the React documentation [on the website](https://reactjs.org/).  

Check out the [Getting Started](https://reactjs.org/docs/getting-started.html) page for a quick overview.

The documentation is divided into several sections:

* [Tutorial](https://reactjs.org/tutorial/tutorial.html)
* [Main Concepts](https://reactjs.org/docs/hello-world.html)
* [Advanced Guides](https://reactjs.org/docs/jsx-in-depth.html)
* [API Reference](https://reactjs.org/docs/react-api.html)
* [Where to Get Support](https://reactjs.org/community/support.html)
* [Contributing Guide](https://reactjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/reactjs/reactjs.org).

## Examples

We have several examples [on the website](https://reactjs.org/). Here is the first one to get you started:

\`\`\`jsx
import { createRoot } from 'react-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);
\`\`\`

This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://reactjs.org/docs/introducing-jsx.html). JSX is not required to use React, but it makes code more readable, and writing it feels like writing HTML. If you're using React as a \`<script>\` tag, read [this section](https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx) on integrating JSX; otherwise, the [recommended JavaScript toolchains](https://reactjs.org/docs/create-a-new-react-app.html) handle it automatically.

## Contributing

The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [Code of Conduct](https://code.fb.com/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://reactjs.org/docs/how-to-contribute.html)

Read our [contributing guide](https://reactjs.org/docs/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/facebook/react/labels/good%20first%20issue) that contain bugs that have a relatively limited scope. This is a great place to get started.

### License

React is [MIT licensed](./LICENSE).
`;

/**
 *  determines the initial value of a markdownPanels state which can be either:
 *  - new array of MarkdownPanelObjectType
 *  - array saved in local storage
 */
const determineInitialStateMarkdownPanels =
    (): Array<MarkdownPanelObjectType> => {
        const markdownPanelsRaw: null | string =
            localStorage.getItem("markdownPanels");
        if (!markdownPanelsRaw) {
            const newMarkdownPanelArr: Array<MarkdownPanelObjectType> = [
                new MarkdownPanel().getObject(),
                new MarkdownPanel().getObject(),
                new MarkdownPanel().getObject(),
            ];

            newMarkdownPanelArr[0].content = markdownPlacehoder;

            localStorage.setItem(
                "markdownPanels",
                JSON.stringify(newMarkdownPanelArr)
            );
            return newMarkdownPanelArr;
        }

        return JSON.parse(markdownPanelsRaw) as Array<MarkdownPanelObjectType>;
    };

const markdownPanelsSlice = createSlice({
    name: "markdownPanels",
    initialState: determineInitialStateMarkdownPanels(),
    reducers: {
        setContentForPanel(
            state,
            action: {
                payload: { panelID: number; content: string };
                type: string;
            }
        ) {
            const newState = _.cloneDeep(state);

            const { panelID, content } = action.payload;
            console.log(action.payload);
            const panelIndex: number = newState.findIndex(
                (panel: MarkdownPanelObjectType) => panel.id === panelID
            );

            if (panelIndex < 0) {
                console.error("ERROR: MARKDOWN PANEL DOESN'T EXIST");
                return;
            }

            newState[panelIndex].content = content;

            console.log(newState);

            localStorage.setItem("markdownPanels", JSON.stringify(newState));
            return newState;
        },
    },
});

const modeSlice = createSlice({
    name: "mode",
    initialState: ProfileVariantEnum.Local,
    reducers: {
        setMode(
            state: ProfileVariantEnum,
            action: {
                payload: ProfileVariantEnum;
                type: string;
            }
        ) {
            return action.payload;
        },
    },
});

const tokenSlice = createSlice({
    name: "token",
    initialState: "",
    reducers: {
        setAccessToken(
            _state,
            action: {
                payload: string;
                type: string;
            }
        ) {
            return action.payload;
        },
    },
});

export const actions = {
    ...calcSlice.actions,
    ...profileSlice.actions,
    ...markdownPanelsSlice.actions,
    ...modeSlice.actions,
    ...tokenSlice.actions,
};

const reducer = combineReducers({
    calc: calcSlice.reducer,
    profile: profileSlice.reducer,
    markdownPanels: markdownPanelsSlice.reducer,
    mode: modeSlice.reducer,
    token: tokenSlice.reducer,
});

const store = configureStore({ reducer });

export default store;
// export default createStore(reducer);
