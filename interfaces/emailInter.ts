/*

### Primitive Types
  string
  number
  boolean
  null
  undefined

### Arrays
  number[]
  string[]

### Tuples
  [number, string] 

### Objects
  { name: string; age: number; }

## Unions
  number | string
  
*/
export type EmailType = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string
  };