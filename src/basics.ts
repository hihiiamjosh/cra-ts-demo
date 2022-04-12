// primitive
export let someStr: string = "a";
export const someNum: number = 20;
export const someBool: boolean = true;
export const someArr1: string[] = ["a"];
export const equalToSomeArr1: Array<string> = ["a"];
export const evil: any = ["a", 200, { t: true, x: () => [] }];

// array tuples
type ColDesc = ["Location", "LocationName", "Value"];
type RowData = [string, string, number];
type GeoData = [ColDesc, ...RowData[]];
const data: GeoData = [
  ["Location", "LocationName", "Value"],
  ["US", "United States", 72],
  ["CA", "Canada", 10],
  ["GB", "United Kingdom", 5],
  ["PH", "Philippines", 5],
  ["NO", "Norway", 5],
  ["DE", "Germany", 1],
  ["IN", "India", 1],
];

// function
export function greet(name: string) {
  const greetWord = "Hello, " + name.toUpperCase() + "!!";
  console.log(greetWord);
  return greetWord;
}

export const equalToGreet = (name: string) => {
  const greetWord = "Hello, " + name.toUpperCase() + "!!";
  console.log(greetWord);
  return greetWord;
};

// optional args
export function printName(first: string, last?: string) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(last.toUpperCase());

  //   Object is possibly 'undefined'.
  if (last !== undefined) {
    // OK
    console.log(last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(last?.toUpperCase());
}

// function overloads
// these two are exposed function signature
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
// this is the real function implementation
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

makeDate(9527);
makeDate(12, 12, 12);

// declaring this
// "this" is a specail ts function arguement which indicates the type of "this" keyword in function
function TooltipFormatter(this: { series: any }, tooltip: string): string {
  console.log(this.series);
  return tooltip;
}

// object
type position = { x: number; y: number };
export function moveTo(pt: position) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
moveTo({ x: 3, y: 7 });

// unknown
type boo = { a: number; b: number };
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

const unknowObj = safeParse("{a: 1, b: 2}");
// cannot be used without some check
console.log(unknowObj.a);

// type guard
// this is a special function (with special return type) that if return true
// the input obj will be inferred as type "boo"
const typeGuardObj = safeParse("{a: 1, b: 2}");
function isBoo(obj: unknown): obj is boo {
  return (obj as { a: 1; b: 2 }).a !== undefined;
}
if (isBoo(typeGuardObj)) {
  // by passing the type guard check, the type of obj is now recongnized as "boo" instead of "unknown"
  console.log(typeGuardObj.a);
}

// type assertion
let typeAssertionObj = safeParse("{a: 1, b: 2}") as boo;
// this will conflict with tsx syntax
typeAssertionObj = <boo>safeParse("{a: 1, b: 2}");
console.log(typeAssertionObj.a);

// literal types
export const literal: "countries" = "countries";
export const yes: 1 = 1;

// union types
type unionType = "countries" | "provinces" | "metros";
export const union: unionType = "metros";

export type CompareResult = -1 | 0 | 1;
export function compare(a: string, b: string): CompareResult {
  return a === b ? 0 : a > b ? 1 : -1;
}

// const assertion - as const
function handleRequest(url: string, method: "GET" | "POST") {}
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, "POST");

// discriminated unions
type IncrementAction = { type: "increment"; payload: number };
type DecrementAction = { type: "decrement"; payload: string };
type ActionType = IncrementAction | DecrementAction;

function reducer(state: any, action: ActionType) {
  switch (action.type) {
    case "increment":
      // narrow down the type of "action" to "IncrementAction"
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

// type alias
type Coordinate = { x: number; y: number };
const bathroom: Coordinate = {};
moveTo(bathroom);

type NBString = string | number;

// type intersection
type Animal = {
  name: string;
};

type Honey = {
  honey: boolean;
};

type Bear = Animal & Honey;

const bear: Bear = {
  name: "xi",
  honey: true,
};

type HasHand = "human" | "monkey";
type HasLeg = "human" | "monkey" | "dog";
type HasHandAndLeg = HasHand & HasLeg;

// type assertion
const coords = [[1, 2]];
// convert [[1, 2]] to { x: 1, y: 2 }
const bedroom = coords.reduce((result, coord) => {
  // should return Coordinate
  return {
    ...result,
    x: coord[0],
    y: coord[1],
  };
}, {} as Coordinate);
moveTo(bedroom);

// enum
export enum EDirection {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

const goto = (dir: EDirection) => {
  switch (dir) {
    case EDirection.Down:
      break;
    default:
      break;
  }
};

goto(EDirection.Up);

// constructs a map object whose property keys are "EDirection" and whose property values are "string".
// typescript will inform you if you miss some enum value mapping.
export const eDirMapping: { [key in EDirection]: string } = {
  [EDirection.Up]: "k",
  [EDirection.Down]: "j",
  [EDirection.Left]: "h",
  // [EDirection.Right]: "l",
};

// enum vs const object
let ODirection = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT",
} as const;

type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

run("DOWN");

export const dirMapping: { [key in Direction]: string } = {
  UP: "k",
  DOWN: "j",
  LEFT: "h",
  RIGHT: "l",
};

// never type
function gototow(dir: Direction) {
  switch (dir) {
    case ODirection.Up:
    case ODirection.Down:
    case ODirection.Left:
      // case ODirection.Right:
      return "";
    default:
      const _exhaustiveCheck: never = dir;
      return _exhaustiveCheck;
  }
}

// class
export class Foo {
  private static staticBoo = "staticBoo";
  private readonly name: string = "world";
  get boo() {
    return this.privateBoo;
  }
  // setter type will be automatically inferred
  set boo(boo) {
    this.privateBoo = boo;
  }
  // declare constructor args with modifier is a syntax sugar for the following code
  // ==========================================================
  // public publicBoo: number;
  // private privateBoo: number;
  // protected protectedBoo: number;
  // constructor(publicBoo: number, privateBoo: number, protectedBoo: number) {
  //   this.publicBoo = publicBoo;
  //   this.privateBoo = privateBoo;
  //   this.protectedBoo = protectedBoo;
  // }
  // ===========================================================
  constructor(
    public publicBoo: number,
    private privateBoo: number,
    protected protectedBoo: number
  ) {
    this.name = "the world";
  }

  private bad() {
    this.name = "bad";
  }
}

const foo = new Foo(1, 2, 3);
foo.bad();
console.log(foo.publicBoo);

export class SubFoo extends Foo {
  myBoo() {
    console.log(this.boo);
    console.log(this.privateBool);
    console.log(this.protectedBoo);
  }
}

const subFoo = new SubFoo(1, 2, 3);
console.log(subFoo);

// interface
// polymorphism
export interface Disposable {
  dispose: () => void;
}

export class Boo1 implements Disposable {
  dispose() {}
  boooooooooo() {}
}

export class Boo2 implements Disposable {
  dispose() {}
}

export class Boo3 {
  // dispose() {}
}

export const dispose = (disposable: Disposable) => {
  disposable.dispose();
};

dispose(new Boo1());
dispose(new Boo2());
dispose(new Boo3());

// TODO: start from here next time, array tuples added
// generic
// data model
interface User {
  name: string;
}
interface Dashboard {
  id: number;
}
interface ApiResponse<T> {
  lastUpdateTime: string;
  realtime: boolean;
  results: T;
}
function getUser(req: any): ApiResponse<User> {
  return {
    lastUpdateTime: "",
    realtime: false,
    results: { name: "josh" },
  };
}
function getDashboard(req: any): ApiResponse<Dashboard> {
  return {
    lastUpdateTime: "",
    realtime: false,
    results: { id: 419019 },
  };
}

// function
const myUseState = <T>(initState: T): [T, (newState: T) => void] => {
  // tuple types
  return [initState, (newState: T) => {}];
  // return [initState, (newState: T) => {}] as const;
};
const [name, setName] = myUseState("josh");

// class
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// restrict generic types
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

const r1 = logLength([2]);
const r2 = logLength<number>(2);

// advanced es features
// optional chaining
interface Result {
  data?: {
    x: number;
    y: number;
  };
}
function getX(r: Result) {
  return r.data?.x;
}

// nullish coalescing
let count = 0;
let render1 = count || "error message";
let render2 = count ?? "error message";

// temporal uncertainty
let lastName: string | null = getLastName();
const fullName = `JOSH ${lastName.toUpperCase()}`;
if (lastName !== null) {
  // setTimeout(() => {
  // }, 0);
  // ['JOSH', 'JOSH2'].forEach(n => {
  // })
}

// easier data transformation demo
export interface Destination {
  TotalBuzz: number;
  NetSentiment: number;
  Passion: number;
}

const transform = (source: RunSearchResult): Destination[] => {};

const reduxData: Destination = transform(runSearch());
