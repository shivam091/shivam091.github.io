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

In this guide, we'll break down **all JavaScript operators** grouped by category, with **clear syntax and real-world examples** for each.

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
console.log(+'5'); // 5
console.log(+'hello'); // NaN
{% endhighlight %}

### `-` Subtraction

This operator subtracts the right operand from the left. It's a mathematical operator.

As a unary operator, it can also be used to signify that a number is negative—for example `-5` isn't subtracting anything, it's indicating that this
number's value is negative 5.

{% highlight js %}
console.log(10 - 4); // 6

// As a unary operator
const negNum = -5;
console.log(5 + negNum); // 0
{% endhighlight %}

### `*` Multiplication

This operator performs a mathematical multiplication operation.

{% highlight js %}
console.log(6 * 7); // 42
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

_Compatibility: ES2016+_

{% highlight js %}
let x = 2;

console.log(x ** 2); // 4
console.log(x ** 3); // 8
{% endhighlight %}

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

Assigns a value to a variable.

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
let a = 5;

console.log(a &= 3); // 1
{% endhighlight %}

#### `|=` Bitwise OR Assignment

This operator performs a bitwise OR operation on a variable, and assigns the result to that same variable.

{% highlight js %}
let a = 5;

console.log(a |= 3); // 7
{% endhighlight %}

#### `^=` Bitwise XOR Assignment

This operator performs a bitwise XOR operation on a variable, and assigns the result to that same variable.

{% highlight js %}
let a = 5;

console.log(a ^= 3); // 6
{% endhighlight %}

#### `<<=` Left Shift Assignment

This operator performs a bitwise left shift operation on a variable, and overwrites the variable with this new value.

{% highlight js %}
let a = 5;

console.log(a <<= 1); // 10
{% endhighlight %}

#### `>>=` Right Shift Assignment

This operator performs a bitwise right shift operation on a variable, and overwrites the variable with this new value (sign-preserving).

{% highlight js %}
let a = 5;

console.log(a >>= 1); // 2
{% endhighlight %}

#### `>>>=` Unsigned Right Shift Assignment

This operator performs a unsigned bitwise right shift (unsigned) operation on a variable, and overwrites the variable with this new value .

{% highlight js %}
let a = -5;

console.log(a >>>= 1); // 2147483645
{% endhighlight %}

## Comparison Operators

### `==` Equality

This operator checks to see if two values are equivalent.

Unlike the _strict equality operator_ (`===`), this operator ignores the type and focuses exclusively on the value.
For example, the number `10` is considered equivalent to the string "10".

{% highlight js %}
console.log(10 == 11); // false
console.log(10 == 10); // true
console.log(10 == '10'); // true
{% endhighlight %}

### `===` Strict Equality

This operator checks to see if two values are equivalent.

Unlike the _equality operator_ (`==`), this operator checks the type as well as the value.
For example, the number `10` is not considered equivalent to the string "10".

{% highlight js %}
console.log(10 === 11); // false
console.log(10 === 10); // true
console.log(10 === '10'); // false
{% endhighlight %}

### `!=` Inequality

{% highlight js %}
{% endhighlight %}

### `!==` Strict Inequality

{% highlight js %}
{% endhighlight %}

### `>` Greater Than

{% highlight js %}
{% endhighlight %}

### `<` Less Than

{% highlight js %}
{% endhighlight %}

### `>=` Greater Than or Equal To

{% highlight js %}
{% endhighlight %}

### `<=` Less Than or Equal To

{% highlight js %}
{% endhighlight %}

## Unary Operators

### `++` Increment

This operator is meant to be used on variables that hold numbers. When used, it increases that variable's value by 1.

This is commonly used in conjunction with `while` loops, or anywhere that requires a counter.

It's functionally equivalent to `x = x + 1`;

{% highlight js %}
let x = 3;
x++;

console.log(x); // 4
{% endhighlight %}

### `--` Decrement

This operator is meant to be used on variables that hold numbers. When used, it decreases that variable's value by 1.

This is commonly used in conjunction with `while` loops, or anywhere that requires a counter.

It's functionally equivalent to `x = x - 1`;

{% highlight js %}
let x = 3;
x--;

console.log(x); // 2
{% endhighlight %}

### `typeof`

{% highlight js %}
{% endhighlight %}

### `delete`

{% highlight js %}
{% endhighlight %}

### `void`

{% highlight js %}
{% endhighlight %}

## Miscellaneous Operators

### `? :` Ternary

{% highlight js %}
{% endhighlight %}

### `,` Comma

{% highlight js %}
{% endhighlight %}

### `?.` Optional Chaining

{% highlight js %}
{% endhighlight %}

### `??` Nullish Coalescing

{% highlight js %}
{% endhighlight %}

### `...` Rest/Spread

{% highlight js %}
{% endhighlight %}

### `.` Property Accessor

{% highlight js %}
{% endhighlight %}

### `|>` Pipeline

{% highlight js %}
{% endhighlight %}

### `=>` Arrow

{% highlight js %}
{% endhighlight %}

## Conclusion

JavaScript operators are powerful tools for transforming, comparing, and assigning values. From simple arithmetic to advanced optional chaining, knowing them well improves both the clarity and efficiency of your code. With new operators being added to the language (like pipeline and logical assignment), staying updated is key to writing modern JavaScript.
