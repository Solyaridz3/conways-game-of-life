const FIELD_HEIGHT = process.stdout.columns;
const FIELD_WIDTH = process.stdout.rows;

const sleep = ms => new Promise(r => setTimeout(r, ms));

const ALIVE = '*';
const DEAD = ' ';
const FREQUENCY = 5; // alive to dead is 1:5

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


const DIRS = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0]
]


const main = async () => {
    const field = createField();
    writeField(field);
    while (true) {
        await sleep(500);
        // console.log('\033[2J'); to clear console on each cycle
        const newField = changeField(field);
        writeField(newField);
    }
};

const countSiblings = (field, i, j) => {
    let siblings = 0;
    for (let coords of DIRS) {
        const siblingX = i + coords[0];
        const siblingY = j + coords[1];
        if (siblingX >= 0 && siblingX < FIELD_WIDTH && siblingY >= 0 && siblingY < FIELD_HEIGHT) {
            if (field[siblingX][siblingY] === ALIVE) {
                siblings++;
            }
        }
    }
    return siblings;
}

const changeField = (buffer) => {
    for (let i = 0; i < FIELD_WIDTH; i++) {
        for (let j = 0; j < FIELD_HEIGHT; j++) {
            let symbol = buffer[i][j];
            const siblings = countSiblings(buffer, i, j);
            if (symbol === ALIVE) {
                if (siblings !== 2 && siblings !== 3) {
                    buffer[i][j] = DEAD;
                }
            } else if (symbol === DEAD) {
                if (siblings === 3) {
                    buffer[i][j] = ALIVE
                }
            }
        }
    }
    return buffer;
}


const writeField = (field) => {
    for (let line of field) {
        for (let symbol of line) {
            process.stdout.write(symbol);
        }
        console.log()
    }
}

const createField = () => {
    const field = [];
    for (let i = 0; i < FIELD_WIDTH; i++) {
        const line = []
        for (let j = 0; j < FIELD_HEIGHT; j++) {
            const symbol = getRandomInt(FREQUENCY) === FREQUENCY - 1 ? ALIVE : DEAD;
            line.push(symbol);
        }
        field.push(line);
    }
    return field;
}


main();
