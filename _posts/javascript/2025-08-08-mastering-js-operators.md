---
layout: post
title: "Mastering JavaScript Operators: A Complete Guide with Examples"
description: "A complete breakdown of all JavaScript operators including arithmetic, logical, assignment, comparison, bitwise, and special operators with syntax and real-world examples."
excerpt: "Learn every JavaScript operator with clear syntax, use cases, and examples—from arithmetic to optional chaining, bitwise, and beyond."
date: 2025-08-09
categories: [JavaScript]
tags: [javascript, operators, syntax, tutorial, programming, webdev, es6+, frontend, cheatsheet]
slug: mastering-js-operators
---

## Introduction

JavaScript offers a wide range of operators that help you write clean, expressive, and efficient code.

Whether you're comparing values, assigning variables, performing calculations, or safely accessing deeply nested properties—**operators are essential to mastering JavaScript.**

In this post, we'll break down **all JavaScript operators** grouped by category, with **clear syntax and real-world examples** for each.

## What You'll Learn

- All JS operators categorized for easy understanding
- Clear code examples and use cases
- Modern syntax like `??`, `?.`, `|>`, and more
- Tips and best practices for clean coding

## Arithmetic Operators

### `+` Addition

This operator adds two numbers together, or concatenates two strings together. If a number and a string are used together, it performs a concatenation.

Less commonly, it can be used as a unary operator, to try and convert a string containing digits to a number. It's a somewhat
obscure trick, and it's generally better to use the `Number()` helper instead.

{% highlight js %}
console.log(5 + 3); // 8
console.log("Hello " + "World"); // "Hello World"

console.log(5 + "3"); // '53'

// As a unary operator
console.log(+'5'); // 5 (number)
console.log(+'hello'); // NaN
console.log(+true); // 1 (number)
{% endhighlight %}

### `-` Subtraction

This operator subtracts the right operand from the left. It's a mathematical operator.

As a unary operator, it can also be used to signify that a number is negative—for example `-5` isn't subtracting anything, it's indicating that this
number's value is negative 5.

{% highlight js %}
console.log(10 - 4); // 6

// As a unary operator
const negNum = -5;
console.log(5 + negNum); // 0 (number)
console.log(-"5"); // -5 (number)
console.log(-false); // -0 (number)
{% endhighlight %}

### `*` Multiplication

This operator performs a mathematical multiplication operation.

{% highlight js %}
let x = 6, y = 7;

console.log(x * y); // 42
{% endhighlight %}

### `/` Division

This operator divides the left operand by the right.

{% highlight js %}
console.log(10 / 2); // 5
console.log(5 / 4); // 1.25
{% endhighlight %}

### `%` Remainder (Modulo)

This operator is in the same mathematical family as Addition (`+`) or Multiplication (`*`).

It evaluates to the remainder of dividing the left operand by the right.

{% highlight js %}
console.log(10 % 3); // 1
console.log(8 % 4); // 0
{% endhighlight %}

### `**` Exponentiation

This operator raises the left operand to the power of the right.

{% highlight js %}
let x = 2;

console.log(x ** 2); // 4
console.log(x ** 3); // 8
{% endhighlight %}

**Compatibility: ES2016+**

## Logical Operators

### `&&` Logical AND

This operator is commonly used to check if all supplied values are truthy.

It also works as a control-flow operator: it will return the first falsy value. If none of the values are falsy, it will return the final value.

{% highlight js %}
// As a logical operator:
if (someCondition && someOtherCondition) {
  // Code here is only run if both variables are true, or truthy.
}

// As a control flow operator:
console.log(0 && 4);         // 0, since it's the first falsy value
console.log(2 && 4);         // 4, since neither value is falsy
console.log(1 && 2 && 3);    // 3, since all values are truthy
console.log('a' && '' && 0); // '', the first falsy value
{% endhighlight %}

### `||` Logical OR

This operator is commonly used to check if either supplied value is truthy.

It also works as a control-flow operator: it will return the first truthy value. If none of the values are truthy, it will return the final value.

{% highlight js %}
// As a logical operator:
if (someCondition || someOtherCondition) {
  // Code here is only run if at least one of
  // the two variables hold truthy values.
}

// As a control flow operator:
console.log(0 || 4);      // 4, since it's the first truthy value
console.log(2 || 4);      // 2, since it's the first truthy value
console.log('' || 0);     // 0, since no values are truthy
console.log(1 || 2 || 3); // 1, since it found a truthy value right away!
{% endhighlight %}

### `!` Logical NOT

This operator, colloquially known as a bang, negates a boolean value.
False becomes true, true becomes false.

It also works on non-boolean values. Any falsy value will evaluate to `true`, and likewise any truthy value will evaluate to `false`.

It can be repeated to turn any truthy value to true, and any falsy value to false.

{% highlight js %}
console.log(!true); // false
console.log(!false); // true

console.log(!0); // true
console.log(!10); // false

console.log(!!0); // false
console.log(!!10); // true
{% endhighlight %}

When placed at the end of a variable, this symbol acts as the TypeScript _Non-null Assertion Operator_ instead.

### `!!` Double NOT

This operator converts any value to strict boolean (true/false).

{% highlight js %}
!!"text"; // true
!!0;     // false
{% endhighlight %}

## Bitwise Operators

Bitwise operators operate on 32-bit integer representations of numbers.

> Caution: Bitwise operators coerce to 32-bit signed integers — not suitable for very large integers.

### `&` Bitwise AND

This operator performs a bitwise AND operation on each bit of two integers

{% highlight js %}
let x = 5, y = 3;

console.log(x & y); // 1  (0101 & 0011 = 0001)
{% endhighlight %}

Not to be confused with the Logical AND operator (`&&`)

### `|` Bitwise OR

This operator performs a bitwise OR operation on each bit of two integers.

{% highlight js %}
let x = 5, y = 3;

console.log(x | y); // 7 (0101 | 0011 = 0111)
{% endhighlight %}

Not to be confused with the Logical OR operator (`||`)

### `^` Bitwise XOR

This operator performs a bitwise exclusive OR on each bit of two integers.

{% highlight js %}
let x = 5, y = 3;

console.log(x ^ y); // 6 (0101 ^ 0011 = 0110)
{% endhighlight %}

### `~` Bitwise NOT

This operator inverts all the bits of the value it's called with (two's complement).

check ex
{% highlight js %}
console.log(~5); // -6
// ~00000000000000000000000000000101
// = 11111111111111111111111111111010 (-6)

{% endhighlight %}

### `<<` Left Shift

This operator shifts bits to the left, adding zeros on the right.

{% highlight js %}
let x = 5, y = 1;

console.log(x << y); // 10 (0101 << 0001 = 1010)
{% endhighlight %}

### `>>` Right Shift

This operator shifts bits to the right, preserving sign bit.

{% highlight js %}
let x = 5, y = 1;

console.log(x >> y); // 2 (0101 >> 0001 = 0010)
{% endhighlight %}

### `>>>` Unsigned Right Shift

This operator shifts bits to the right, filling with zeros, ignoring sign.

check ex
{% highlight js %}
let x = -5;

console.log(x >>> 1); // -5 >>> 1 = 2147483645
{% endhighlight %}

## Assignment Operators

Assignment operators assign values to variables.

### Arithmetic Assignment Operators

#### `=` Assignment

This operator assigns a value to the variable.

{% highlight js %}
let x = 10;

console.log(x); // 10
{% endhighlight %}

#### `+=` Addition Assignment

This operator adds a value to the variable, and overwrites that variable's value with the result.

{% highlight js %}
let x = 10;
x += 2;

console.log(x); // 12 (10 + 2)
{% endhighlight %}

#### `-=` Subtraction Assignment

This operator subtracts a value from the variable, and overwrites that variable's value with the result.

{% highlight js %}
let x = 10;
x -= 2;

console.log(x); // 8 (10 - 2)
{% endhighlight %}

#### `*=` Multiplication Assignment

This operator multiplies a variable by a value, and overwrites that variable's value with the result.

{% highlight js %}
let x = 10;
x *= 2;

console.log(x); // 20 (10 * 2)
{% endhighlight %}

#### `/=` Division Assignment

This operator divides a variable by a value, and overwrites that variable's value with the result.

{% highlight js %}
let x = 10;
x /= 2;

console.log(x); // 5 (10 / 2)
{% endhighlight %}

#### `%=` Remainder Assignment

This operator assigns the remainder after division, and overwrites that variable's value with the result.

{% highlight js %}
let x = 10;
x %= 2;

console.log(x); // 2 (10 %= 4)
{% endhighlight %}

#### `**=` Exponentiation Assignment

This operator applies an exponentiation (bringing the value to the power of X), an assigns the result to the affected variable.

{% highlight js %}
let x = 10;
x **= 2;

console.log(x); // 100 (10 ** 2)
{% endhighlight %}

### Logical Assignment Operators

#### `&&=` Logical AND Assignment

This operator assigns a value to a variable, but only if that variable already holds a `truthy` value.

{% highlight js %}
let x = 0;
let y = 1;

x &&= 2; // No effect, since 0 is falsy
y &&= 2; // Assigns 2, since 1 is truthy

console.log(x, y); // 0, 2
{% endhighlight %}

#### `||=` Logical OR Assignment

This operator assigns a value to a variable, but only if that variable already holds a `falsy` value.

{% highlight js %}
let x = 0;
let y = 1;

x ||= 2; // Assigns 2, since 0 is falsy
y ||= 2; // Has no effect, since 'y' held a truthy value

console.log(x, y); // 2, 1
{% endhighlight %}

#### `??=` Logical Nullish Assignment

This operator updates a variable with a new value, but only if that variable currently holds a "nullish" value (either `null` or `undefined`).
This operator is also known as _**Nullish Coalescing Assignment**_.

{% highlight js %}
let x = 0;
let y = null;
let z;

x ??= 2; // Has no effect, since 'x' already holds a value
y ??= 2; // Updates 'y' to hold this new value
z ??= 2; // Updates 'z' to hold this new value (by not assigning 'z' a value initially, it was considered undefined).

console.log(x, y, z); // 0, 2, 2
{% endhighlight %}

### Bitwise Assignment Operators

#### `&=` Bitwise AND Assignment

This operator performs a bitwise AND operation to a variable, and overwrites the result into the same variable.

{% highlight js %}
let x = 5;
x &= 3

console.log(x); // 1
{% endhighlight %}

#### `|=` Bitwise OR Assignment

This operator performs a bitwise OR operation on a variable, and assigns the result to that same variable.

{% highlight js %}
let x = 5;
x |= 3

console.log(x); // 7
{% endhighlight %}

#### `^=` Bitwise XOR Assignment

This operator performs a bitwise XOR operation on a variable, and assigns the result to that same variable.

{% highlight js %}
let x = 5;
x ^= 3

console.log(x); // 6
{% endhighlight %}

#### `<<=` Left Shift Assignment

This operator performs a bitwise left shift operation on a variable, and overwrites the variable with this new value.

{% highlight js %}
let x = 5;
x <<= 1

console.log(x); // 10
{% endhighlight %}

#### `>>=` Right Shift Assignment

This operator performs a bitwise right shift operation on a variable, and overwrites the variable with this new value (sign-preserving).

{% highlight js %}
let x = 5;
x >>= 1

console.log(x); // 2
{% endhighlight %}

#### `>>>=` Unsigned Right Shift Assignment

This operator performs a unsigned bitwise right shift (unsigned) operation on a variable, and overwrites the variable with this new value .

{% highlight js %}
let x = -5;
x >>>= 1

console.log(x); // 2147483645
{% endhighlight %}

## Comparison Operators

> Note: Comparison involving `NaN` is always `false` (except `Object.is`), and `NaN !== NaN`

### `==` Equality

This operator checks to see if two values are equivalent.

Unlike the _strict equality operator_ (`===`), this operator ignores the type and focuses exclusively on the value.
For example, the number `10` is considered equivalent to the string "10".

{% highlight js %}
let x = 10;

// The numbers are different so they're not equal.
console.log(x == 11); // false

// The numbers are the same, so they're equal!
console.log(x == 10); // true

// The value matches, regardless of type.
console.log(x == "10'); // true
{% endhighlight %}

### `===` Strict Equality

This operator checks to see if two values are equivalent.

Unlike the _equality operator_ (`==`), this operator checks the type as well as the value.
For example, the number `10` is not considered equivalent to the string "10".

{% highlight js %}
let x = 10;

// The numbers are different so they're not equal.
console.log(x === 11); // false

// The numbers are the same, so they're equal!
console.log(x === 10); // true

// The values are the same, but the type is different.
console.log(x === "10'); // false
{% endhighlight %}

### `!=` Inequality

This operator checks to see if two values are not equal (type coercion allowed).

Unlike the _strict inequality operator_ (`!==`), the value's type isn't considered. For example, the number `2` is considered
equivalent to the string "2", so the expression `2 != '2'` returns `false`. This is generally a bad thing, and it's recommended
to use the **strict inequality operator** instead.

{% highlight js %}
const x = 10;

// The numbers are different, so they are inequal.
console.log(x != 11); // true

// The numbers are the same, they are not inequal.
console.log(x != 10); // false

// Even though the types are different, the values are the same, so they're considered equal.
console.log(x != "10"); // false
{% endhighlight %}

### `!==` Strict Inequality

This operator checks to see if two values are not equivalent.

Unlike the _inequality operator_ (`!=`), this operator considers the type as well as the value. For example, the number `2`
is not considered equivalent to the string "2".

{% highlight js %}
const x = 10;

// The numbers are different, so they are inequal.
console.log(x !== 11); // true

// The numbers are the same, so they're not inequal.
console.log(x !== 10); // false

// The values are the same, but the type is different, so they are still considered inequal.
console.log(x !== "10"); // true
{% endhighlight %}

### `>` Greater Than

This operator checks to see if the value on the left is larger than the value on the right.

For numbers, this works as you'd probably expect. For strings, things can be surprising; each character is converted to its
appropriate character code. This means that casing matters, as shown in the examples below.

{% highlight js %}
console.log(10 > 15); // false
console.log(-20 > 15); // false
console.log(0.5 > 1); // false
console.log(1 > 1); // false
console.log('b' > 'a'); // true
console.log('B' > 'a'); // false
{% endhighlight %}

### `<` Less Than

This operator checks to see if the value on the left is smaller than the value on the right.

For numbers, this works as you'd probably expect. For strings, things can be surprising; each character is converted to its
appropriate character code. This means that casing matters, as shown in the examples below.

{% highlight js %}
console.log(10 < 15); // true
console.log(-20 < 15); // true
console.log(0.5 < 1); // true
console.log(1 < 1); // false
console.log('b' < 'a'); // false
console.log('B' < 'a'); // true
{% endhighlight %}

### `>=` Greater Than or Equal To

This operator checks to see if the value on the left is larger than, or the same as, the value on the right.

For numbers, this works as you'd probably expect. For strings, things can be surprising; each character is converted to its
appropriate character code. This means that casing matters, as shown in the examples below.

{% highlight js %}
console.log(10 >= 15); // false
console.log(-20 >= 15); // false
console.log(0.5 >= 1); // false
console.log(1 >= 1); // true
console.log('b' >= 'a'); // true
console.log('B' >= 'a'); // false
{% endhighlight %}

### `<=` Less Than or Equal To

This operator checks to see if the value on the left is smaller than, or the same as, the value on the right.

For numbers, this works as you'd probably expect. For strings, things can be surprising; each character is converted to its
appropriate character code. This means that casing matters, as shown in the examples below.

{% highlight js %}
console.log(10 <= 15); // true
console.log(-20 <= 15); // true
console.log(0.5 <= 1); // true
console.log(1 <= 1); // true
console.log('b' <= 'a'); // false
console.log('B' <= 'a'); // true
{% endhighlight %}

### `instanceof`

This operator tests whether an object has the prototype property of a given constructor in its prototype chain.
It returns `true` if the left operand is an instance of the right operand, otherwise `false`.

This is useful for type checking, especially when working with custom classes.

{% highlight js %}
class Animal {}
class Dog extends Animal {}

const myDog = new Dog();

console.log(myDog instanceof Dog);     // true  -> myDog's prototype chain includes Dog.prototype
console.log(myDog instanceof Animal);  // true  -> myDog inherits from Animal
console.log(myDog instanceof Object);  // true  -> All objects inherit from Object
console.log(myDog instanceof Array);   // false -> Array not in myDog's prototype chain
{% endhighlight %}

## Unary Operators

### `++` Increment

This operator is meant to be used on variables that hold numbers. When used, it increases that variable's value by 1.

It can be used as a prefix (`++x`) or postfix (`x++`) operator, affecting when the increment occurs relative to the expression's evaluation.

This is commonly used in conjunction with `while` loops, or anywhere that requires a counter.

It's functionally equivalent to `x = x + 1`;

{% highlight js %}
let x = 5;
console.log(++x); // 6 (x is now 6)

let y = 5;
console.log(y++); // 5 (y is now 6)
{% endhighlight %}

### `--` Decrement

This operator is meant to be used on variables that hold numbers. When used, it decreases that variable's value by 1.

Similar to increment, it can be prefix or postfix.

This is commonly used in conjunction with `while` loops, or anywhere that requires a counter.

It's functionally equivalent to `x = x - 1`;

{% highlight js %}
let x = 10;
console.log(--x); // 9 (x is now 9)

let y = 10;
console.log(y--); // 10 (y is now 9)
{% endhighlight %}

### `typeof`

This operator is used to determine the data type of its operand. It returns a string indicating the type of the evaluated operand.

{% highlight js %}
console.log(typeof "hello"); // "string"
console.log(typeof 123); // "number"
console.log(typeof undefined); // "undefined"
console.log(typeof true); // "boolean"
console.log(typeof Symbol()); // "symbol"
console.log(typeof {}); // "object" (object literal)
console.log(typeof []); // "object" (array)
console.log(typeof function() {}); // "function" (function)
{% endhighlight %}

**Purpose and Use Cases:**

This operator is useful for:

- **Type checking**: Verifying the data type of a variable or value, especially when dealing with dynamic or unknown data.
- **Conditional logic**: Performing different actions based on the type of a variable.
- **Debugging**: Identifying unexpected data types during development.

### `delete`

This operator is used to remove a property from an object or an element from an array.

{% highlight js %}
const person = {
  name: "John Doe",
  age: 30
};

delete person.age; // Removes the 'age' property from the person object.
console.log(person); // Output: { name: "John Doe" }
{% endhighlight %}

**Important Considerations:**

- The `delete` operator is designed for object properties and has no effect on variables or functions declared directly in the global
  scope or within a function scope.
- Avoid using `delete` on properties of predefined JavaScript objects (e.g., `Array`, `Boolean`, `Date`, `Function`, `Math`, `Number`, `RegExp`, `String`)
  as this can lead to unexpected behavior or application crashes.
- In performance-critical applications, frequent use of delete can potentially lead to de-optimization by JavaScript engines.
- The `delete` operator can not be used to delete elements from the DOM. This is typically achieved by manipulating the DOM using methods like
  `removeChild()` or using the newer `remove()`.

### `void`

This operator evaluates an expression and returns `undefined`.

The primary function of `void` is to ensure that the result of an expression is `undefined`. This is useful when
you want to execute code but explicitly discard any return value.

{% highlight js %}
let x = 1, y = 2;

console.log(void(x + y)); // undefined
{% endhighlight %}

## Special Operators

### `? :` Ternary

This operator is also known as the conditional operator, provides a concise way to write conditional expressions. It is a shorthand for
a simple `if...else` statement and is the only JavaScript operator that takes three operands.

{% highlight js %}
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";

console.log(canVote); // "Yes"
{% endhighlight %}

### `,` Comma

This operator evaluates each of its operands from left to right and returns the value of the rightmost operand. It is distinct from commas used as separators in array literals, object literals, or function parameters/arguments.

{% highlight js %}
let x = (10, 20, 30);

console.log(x) // 30

let a = 1;
let b = (a++, a + 5);

console.log(a) // 2
console.log(b) // 7 (2 + 5)
{% endhighlight %}

### `?.` Optional Chaining

This operator is similar to the _Property Accessor operator_ (`.`); used to access a property of an object with a difference that it's safe to chain;
if at any point, a nullish value (`null` or `undefined`) is encountered, the chain short-circuits and returns `undefined`.

{% highlight js %}
const user = {
  profile: {
    name: "Harshal",
    age: 21
  }
};
console.log(user.address.street); // Uncaught TypeError: Cannot read properties of undefined (reading 'street')
console.log(user?.address?.street); // undefined
console.log(user?.profile?.age); // 21

/* When the property name is stored in a variable: */
const outerKey = "profile";
const relevantKey = "age";

console.log(user?.[outerKey]?.[relevantKey]);
{% endhighlight %}

**Compatibility: ES2020+**

### `??` Nullish Coalescing

This relatively-new addition to the language is similar to the Logical OR operator (`||`), except instead of relying on truthy/falsy values,
it relies on "nullish" values (`null` and `undefined`).

{% highlight js %}
console.log(4 ?? 5); // 4, since neither value is nullish
console.log(null ?? 10); // 10, since 'null' is nullish
console.log(undefined ?? 0); // 0, since 'undefined' is nullish

// Here's a case where it differs from Logical OR (||):
console.log(0 ?? 5); // 0
console.log(0 || 5); // 5
{% endhighlight %}

**Compatibility: ES2020+, it was introduced in Chrome 80 / Firefox 72 / Safari 13.1. It has no IE support.**

### `...` Rest/Spread

It's technically not an operator, it's special syntax we can use and it serves two mirror purposes:

- **Rest:** This syntax is used in function definitions to collect additional function arguments. It's useful when you don't know how many
parameters a function needs. It collects them into an array.

- **Spread:** This syntax performs the opposite of "rest", and can be used to populate a function from an array. It can also be used to
clone or merge arrays and objects.

{% highlight js %}
/* Rest */
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3)); // 6

/* Spread */
const threeNums = [1, 2, 3]; // 6

console.log(sum(...threeNums));

/* Cloning an array */
const data = [1, 2, 3];
const dataCopy = [...data, 4];

console.log(dataCopy); // [1, 2, 3, 4]

/* Merging an object */
const obj = { a: 1, b: 1 };
const newObj = {...obj, b: 2};

console.log(newObj); // { a: 1, b: 2 };
{% endhighlight %}

### `.` Property Accessor

This operator is used to pluck out a property from an object. This only works if you know the key of the property.

{% highlight js %}
const person = {
  name: "Harshal",
  address: {
    city: "Mumbai",
    province: "Maharashtra",
    country: "India"
  }
}

console.log(person.name); // "Harshal"
console.log(person.address.city); // "Mumbai"
{% endhighlight %}

If the property name is held in a variable, you'll need to use bracket notation instead:

{% highlight js %}
const relevantKey = "city";

console.log(person.address.relevantKey); // undefined
console.log(person.address[relevantKey]); / "Mumbai"
{% endhighlight %}

### `|>` Pipeline

It functions as a sort of "inverted" function call; instead of calling a function with an argument, you "pipe" an argument into a function.

It reads left-to-right like a chain of transformations (similar to Unix pipes or functional languages).

{% highlight js %}
/* Traditional function call */
function multiply(x) {
  return x * 2;
}
let result = multiply(5);

console.log(result); // 10

/* Proposed piped alternative */
let result = 5 |> (x => x * 2);

console.log(result); // 10
{% endhighlight %}

**Compatibility: The pipeline operator is a TC39 stage-2 proposal, not standard yet.**

### `=>` Arrow

This operator provides a concise syntax for writing function expressions.

**Concise Syntax:** Arrow functions offer a shorter way to define functions, particularly for simple, single-line functions or callbacks.

{% highlight js %}
/* Traditional function */
function add(a, b) {
  return a + b;
}

/* Using arrow operator */
const add = (a, b) => a + b;
{% endhighlight %}

**Implicit Return:** For single-expression arrow functions, the `return` keyword and curly braces `{}` can be omitted, and the
expression's result is implicitly returned.

{% highlight js %}
const multiply = (x, y) => x * y;

// Arrow functions are convenient when used as callbacks for array methods:
const nums = [-2, -1, 0, 1, 2];
const positiveNums = nums.filter(num => num >= 0);

console.log(positiveNums); // [0, 1, 2]
{% endhighlight %}

> Note: Arrow functions are somewhat limited: they don't have their own context (so `this` cannot be used), nor can they be used as constructors.

## Quick Tips

1. Use `===` and `!==` instead of `==` and `!=` to avoid type coercion confusion.
2. Use `??` instead of `||` when you only want to handle `null` or `undefined`.
3. Be careful with bitwise operators—they convert numbers to **32-bit signed integers**.
4. `!!value` is a handy trick to convert any value to `true` or `false`.

## Quick Tips & Best Practices

1. Prefer `===` / `!==` over `==` / `!=` to avoid surprises from type coercion.
2. Use `??` for defaulting nullish values (`null` or `undefined`). Use `||` when you also want to treat `0`, `""`, `false` as fallbacks.
3. Use `?.` when reading deeply nested object properties to avoid `TypeError`.
4. `!!value` is a succinct pattern to convert any value to boolean.
5. Be careful with bitwise ops — they coerce to 32-bit ints and can be surprising with negative numbers.
6. Logical assignment `(&&=`, `||=`, `??=`) is a readable way to conditionally assign without repeating the variable.
7. Know precedence when mixing many operators or use parentheses to make intentions explicit.

## Conclusion

JavaScript operators are powerful tools for transforming, comparing, and assigning values. From simple arithmetic to advanced optional chaining, knowing them well improves both the clarity and efficiency of your code. With new operators being added to the language (like pipeline and logical assignment), staying updated is key to writing modern JavaScript.

Operators are the building blocks of logic and computation in JavaScript. Mastering them gives you cleaner, more efficient code and helps avoid subtle bugs.

JavaScript operators are fundamental tools for everyday coding. From arithmetic and comparisons to modern features like optional chaining and nullish coalescing, operators make code compact and expressive — but they also bring pitfalls (type coercion, precedence, bitwise conversion). Use strict equality, prefer nullish checks where appropriate, and always keep readability in mind: explicitness beats cleverness.
