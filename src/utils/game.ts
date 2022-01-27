export const Config = {
  MaxLetters: 19,
  TileCount: 6,
  TileSize: 60,
  TileSpacing: 10,
};

export enum CursorDirections {
  LeftToRight = "left-to-right",
  TopToBottom = "top-to-bottom",
}

type Cursor = {
  row: number;
  col: number;
  direction: CursorDirections;
};

export type Letter = {
  id: string;
  letter: string; // TODO: refactor to `char`
};

export enum TileState {
  IDLE = "idle",
  VALID = "valid",
  INVALID = "invalid",
  MIXED = "mixed",
}

export type Tile = {
  id: string;
  row: number;
  col: number;
  letter: Letter | null;
  state: TileState;
};

export type Board = {
  tiles: Tile[][];
  cursor: Cursor;
};

// https://en.wikipedia.org/wiki/Bananagrams#cite_note-7
const Letters = [
  "J",
  "K",
  "Q",
  "X",
  "Z",
  "J",
  "K",
  "Q",
  "X",
  "Z",
  "B",
  "C",
  "F",
  "H",
  "M",
  "P",
  "V",
  "W",
  "Y",
  "B",
  "C",
  "F",
  "H",
  "M",
  "P",
  "V",
  "W",
  "Y",
  "B",
  "C",
  "F",
  "H",
  "M",
  "P",
  "V",
  "W",
  "Y",
  "G",
  "G",
  "G",
  "G",
  "L",
  "L",
  "L",
  "L",
  "L",
  "D",
  "S",
  "U",
  "D",
  "S",
  "U",
  "D",
  "S",
  "U",
  "D",
  "S",
  "U",
  "D",
  "S",
  "U",
  "D",
  "S",
  "U",
  "N",
  "N",
  "N",
  "N",
  "N",
  "N",
  "N",
  "N",
  "T",
  "R",
  "T",
  "R",
  "T",
  "R",
  "T",
  "R",
  "T",
  "R",
  "T",
  "R",
  "T",
  "R",
  "T",
  "R",
  "T",
  "R",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "O",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "I",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
  "E",
];

// @TODO use a seeded randomizer so we can get one combo per day.
function getRandom<T>(arr: T[], n: number) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export function shuffle<T>(arr: T[]) {
  return getRandom(arr, arr.length);
}

export function getRandomLetters(n: number) {
  return getRandom(Letters, n);
}

export function wrapCursor(board: Board, cursor: Cursor): Cursor {
  const maxRow = board.tiles.length;
  const maxCol = board.tiles[0].length;

  const rowOverflow = Math.floor(cursor.row / maxRow);
  const colOverflow = Math.floor(cursor.col / maxCol);

  // Simple case, just bring back to reality.
  if (rowOverflow && colOverflow) {
    return {
      row: cursor.row % maxRow,
      col: cursor.col % maxCol,
      direction: cursor.direction,
    };
  }

  // If only the row is overflowing, increment as needed.
  if (rowOverflow > 0) {
    return {
      row: cursor.row % maxRow,
      col: (cursor.col + rowOverflow) % maxCol,
      direction: cursor.direction,
    };
  }

  // If only the col is overflowing, increment as needed.
  if (colOverflow > 0) {
    return {
      row: (cursor.row + colOverflow) % maxRow,
      col: (maxCol + cursor.col) % maxCol,
      direction: cursor.direction,
    };
  }

  // If only the row is underflowing, increment as needed.
  if (rowOverflow < 0) {
    return {
      row: (maxRow + cursor.row) % maxRow,
      col: (maxCol + cursor.col + rowOverflow) % maxCol,
      direction: cursor.direction,
    };
  }
  // If only the col is underflowing, increment as needed.
  if (colOverflow < 0) {
    return {
      row: (maxRow + cursor.row + colOverflow) % maxRow,
      col: (maxCol + cursor.col) % maxCol,
      direction: cursor.direction,
    };
  }

  return cursor;
}

export function incrementCursor(board: Board): Cursor {
  const cursor = board.cursor;

  switch (cursor.direction) {
    case CursorDirections.LeftToRight:
      return wrapCursor(board, {
        row: cursor.row,
        col: cursor.col + 1,
        direction: cursor.direction,
      });
    case CursorDirections.TopToBottom:
      return wrapCursor(board, {
        row: cursor.row + 1,
        col: cursor.col,
        direction: cursor.direction,
      });
  }
}

export function decrementCursor(board: Board): Cursor {
  const cursor = board.cursor;

  switch (cursor.direction) {
    case CursorDirections.LeftToRight:
      return wrapCursor(board, {
        row: cursor.row,
        col: cursor.col - 1,
        direction: cursor.direction,
      });
    case CursorDirections.TopToBottom:
      return wrapCursor(board, {
        row: cursor.row - 1,
        col: cursor.col,
        direction: cursor.direction,
      });
  }
}
