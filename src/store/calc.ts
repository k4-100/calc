import { createSlice } from "@reduxjs/toolkit";
import _, { cloneDeep } from "lodash";
import { evaluate } from "mathjs";
import {
    CellClassObjectType,
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

export default calcSlice;
