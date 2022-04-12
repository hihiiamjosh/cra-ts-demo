# Typescript basics

[Sample Codes Are Here](../src/basics.ts)

## `primitive types`

- string
- number
- boolean
- array
  - array tuples
- function
  - function signature
  - optional args
  - overloads
  - declaring `this`
- object
- null
- undefined

## `other types`

- void
- any
- unknown - safer any
  - unlike "any" type, "unknown" need to pass additional type check before using
    - type guard
      - special functions for typescript to infer the type
      - can check type in runtime
    - type assertion
      - directly tell typescript what is the type
      - can only check type in compile time
- literal types
- union types
  - const assertion
  - discriminated unions
    - the unioned types must have the same shape

## `typescript keywords`

- type alias
  - store and reuse type
  - type intersection
  - type assertion
- enum
  - use `never` type to protect in switch statement
    - The never type is assignable to every type; however, no type is assignable to never (except never itself).
  - issues
    - in fact this is a feature called [reverse mapping](https://www.typescriptlang.org/docs/handbook/enums.html#reverse-mappings)
  - compare with const object
    - https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums
- class
  - inheritance
  - modifier
    - syntax sugar
- interface
  - polymorphism
  - often used to define data model
  - [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- generic

## `others`

- advanced es features
  - optional chaining
  - nullish coalescing
- temporal uncertainty
- easier data transformation demo
- namespace => es6 module is preferred
- typescript will not reduce bugs

## `refs`

- [typescript official handbook](https://www.typescriptlang.org/docs/handbook/)
- [typescript-cheatsheets/react](https://github.com/typescript-cheatsheets/react)
- tc39 proposal
  - https://github.com/tc39
  - https://devblogs.microsoft.com/typescript/a-proposal-for-type-syntax-in-javascript/
  - https://github.com/giltayar/proposal-types-as-comments/
