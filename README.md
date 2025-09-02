# WIP: assert - The JavaScript DuckTyping assertion library

Assertions are an essential part of many programming languages. Unfortunately, JavaScript doesn't have an assertion API.
So, it is up to the community to create one.

JavaScript is a dynamically typed language and only has a limited set of primitives data types and an additional set of
object types that wrap the primitives and expose various prototype functions. I have chosen to take these 100%
formalized data types as a reference for which this assertion library is written against - meaning, there are assertions
that can be made specifically against these primitives (e.g. `Assert.string('apple')`).

For anything that isn't a primitive there is an assertion function that does duck typing. This allows the engineer to
explicitly state that there is an expectation that argument responds to a specific call. Say, for example, that you
have a user object that has the user's first and last name and you want to write a function that takes a user object
and returns their full name; given this case, there is an expectation that the user object would respond to `firstName`
and `lastName`. So, with the duck type assertion, we can make that explicitly clear by writing
`Assert.duckType(user, 'firstName', 'lastName')`.

|> Note: While my library is perfectly capable of being used within a node.js project; if you are using node.js, then
they have an assert utility that can be imported from `node:assert`.

## Table of contents
1. Purpose
2. Getting started
3. General usage

# Purpose
The purpose of assertions in many programming languages is to allow the engineer to make a declaration of intent as it
relates to a particular parameter or variable. Generally the declaration of intent is tied to the type definition, but
it can be other statements of fact. For example, when creating a `sum(a, b)` the general expectation would be that `a`
and `b` are numbers; so you might opt to declare them to be so within the function:

```javascript
function sum(a, b) {
    Assert.number(a);
    Assert.number(b);

    return a + b;
}
```

Another example in which you might want to assert something more specific other than the type definition would be a
division function. While we would generally expect `numerator` and `denominator` to be numbers again, division has a
unique rule in which the denominator cannot be `0`. While it would be perfectly valid to have a check in which if the
denominator is `0` then function return `Infinity`; for the sake of our example we want to declare that the denominator
_cannot_ be `0`.

```javascript
function div(numerator, denominator) {
    Assert.number(numerator);
    Assert.number(denominator);
    Assert.notEqual(denominator, 0);

    return numerator / denominator;
}
```

# Getting started
TODO: Finish documenting this upon initial completion of the library.

# General usage
TODO: Finish documenting this upon initial completion of the library.

