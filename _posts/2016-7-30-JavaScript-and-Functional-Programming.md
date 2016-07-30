---
layout: post
title: JavaScript and Functional Programming
---

<p class="description">This is a write up of my notes (plus some further research) from Kyle Simpson's excellent class <b>Functional-Light JavaScript</b> (slides <a href="https://speakerdeck.com/getify/functional-light-javascript">here</a>) on 29 of June, 2016.</p> 

A programming paradigm is a style of programming. Object-oriented programming and functional programming are two such paradigms. Although there are tensions between them, they are not mutually exclusive.

Functional programming emphasises the importance minimising the number of changes to the program's state. It favours a declarative style and encourages the use of well-named functions that allow you to write programs by describing what you want to happen, with the details of how it happens packaged away out of immediate sight.

JavaScript has the tools to support both paradigms.  Even without using it exclusively as a functional language, there are concepts and best practices from the functional paradigm that we can use to make our own code cleaner, more readable, and easier to reason about.

## Minimise Side Effects

A *side effect* is a change that is not local to the function that caused it. A function might do something like manipulate the DOM, modify the value of a variable in a higher level scope or write data to a database. The results of these actions are side effects.

```javascript
// A function with a side effect
var x = 10;

const myFunc = function ( y ) {
	x = x + y;
};

myFunc( 3 );
console.log( x ); // 13

myFunc( 3 );
console.log( x ); // 16
```

Side effects are not inherently evil. A program that produced no side effects would not affect the world, and so there would be no point to it (other than perhaps as a theoretical curiousity). They are, however, dangerous and should be avoided wherever they are not strictly necessary.

When a function produces a side effect you have to know more than just its inputs and output to understand what that function does. You need to know about the context and history of the state of the program, which makes the function harder to understand. Side effects can cause bugs by interacting in unpredictable ways, and the functions that produce them are harder to test thanks to their reliance on the context and history of the program's state.

Minimising side effects is such a fundamental principle of functional programming that most of the following sections can be understood as outlining techniques to avoid them.

## Write Pure Functions

A *pure function* is a function that does not change the program's state and does not produce an observable side effect. The output of a pure function relies solely on its input values. Wherever and whenever a pure function is called, its return value will always be the same when given the same inputs.

Side effects can be kept to a minimum by writing pure functions whenever possible. In addition, their indifference to context make them highly testable and reusable.

`myFunc` from the section above is an impure function; note how it's called twice with the same input and gives a different result each time. It could, however, be re-written as a pure function:

```javascript
// Make the global variable local.
const myFunc = function ( y ) {
	const x = 10;
	return x + y;
}

console.log(myFunc( 3 )); // 13
console.log(myFunc( 3 )); // 13
```

```javascript
// Use x as a parameter.
const x = 10;

const myFunc = function ( x, y ) {
	return x + y;
}

console.log(myFunc( x, 3 )); // 13
console.log(myFunc( x, 3 )); // 13
```

Ultimately, however, your program will require some side effects. One of JavaScript's main roles is DOM manipulation, and any change made to the DOM is of course a side effect. When side effects are unavoidable, there are techniques you can use to minimise their hazards. For example, you can separate your logic from your DOM manipulation by using an MVC pattern or similar. 

## Write Function-Generating Functions

Functional programming involves writing a lot of functions. This process can be made [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)-er by generating new functions from existing ones. 

One feature of JavaScript that makes the function generating techniques of this section possible is *closure*. Closure is the ability of functions to access variables from containing scopes, even when those scopes no longer exist.

In JavaScript, functions are treated as values. This is the second feature of JavaScript that makes these techniques possible. It makes it possible to write functions that take other functions as arguments and / or return functions as their output. These kinds of functions are called *higher-order functions*. 

The combination of closure and support for higher-order functions allows you to write functions that return other functions which can "remember" the arguments passed to the container function, and are able to use them elsewhere in the program.

### Function Composition

Functions can be combined to form new functions through *function composition*. Here is an example:

```javascript
// The function addThenSquare is made by combining the functions add and square.

const add = function ( x, y ) {
	return x + y;	
};

const square = function ( x ) {
	return x * x;
};

const addThenSquare = function ( x, y ) {
	return square(add( x, y ));
};
```

You may find yourself repeating this pattern of generating a more complex function from smaller functions. Often it's more efficient to write a function that does the composition for you:

```javascript
const add = function ( x, y ) {
	return x + y;	
};

const square = function ( x ) {
	return x * x;
};

const composeTwo = function ( f, g ) {
	return function ( x, y ) {
		return g( f ( x, y ) );	
	};
};

const addThenSquare = composeTwo( add, square );
```

`composeTwo` is useful, but limited. It can only combine two functions and `f` can only accept two arguments. We can write more general composition functions: 

```javascript
// This version of composeTwo can accept any number of arguments for the initial function.
const composeTwo = function ( f, g ) {
	return function ( ...args ) {
		return g( f( ...args ) );
	};
};

// composeMany can accept any number of functions as well as any number of arguments for the initial function.
const composeMany = function ( ...args ) {
	const funcs = args;
	return function ( ...args ) {
        funcs.forEach(( func ) => {
        	args = [func.apply( this, args )]; 
        });
        return args[0];
	};
};
```

You should try to come up with a composition function (or several) that has both the right level of generality for your program and an API that you like.

### Partial Function Application

*Partial function application* is the process of fixing the value of one or more of a function's arguments, and then returning the function to be fully invoked later.

In the following example, `double`, `triple`, and `quadruple` are partial applications of `multiply`.

```javascript
const multiply = function ( x, y ) {
	return x * y;
};

const partApply = function ( fn, x ) {
	return function ( y ) {
		fn( x, y );
	};
};

const double = partApply( multiply, 2 );
const triple = partApply( multiply, 3 );
const quadruple = partApply( multiply, 4 );
```

### Currying

*Currying* is the process of translating a function that takes multiple arguments into a series of functions that each take one argument.

```javascript
const multiply = function ( x, y ) {
	return x * y;
};

const curry = function ( fn ) {
	return function ( x ) {
		return function ( y ) {
			return fn( x, y );
		};
	};	
};

const curriedMultiply = curry( multiply );

const double = curriedMultiply( 2 );
const triple = curriedMultiply( 3 );
const quadruple = curriedMultiply( 4 );

console.log(triple( 6 )); // 18
```

Currying and partial application are conceptually similar (and you'll probably never need both), but still distinct. The main difference is that currying will always produce a nested chain of functions that each accept only one argument, whereas partial application can return functions that accept more than one argument. This distinction is clearer when you compare their effects on functions that accept at least three arguments:

```javascript
const multiply = function ( x, y, z ) {
	return x * y * z;	
};

const curry = function ( fn ) {
	return function ( x ) {
		return function ( y ) {
			return function ( z ) {
				return fn( x, y, z );
			};
		};
	};	
};

const partApply = function ( fn, x ) {
	return function ( y, z ) {
		return fn( x, y, z );
	};
};

const curriedMultiply = curry( multiply );
const partiallyAppliedMultiply = partApply( multiply, 10 );

console.log(curriedMultiply( 10 )( 5 )( 2 )); // 100
console.log(partiallyAppliedMultiply( 5, 2 )); // 100
```

## Treat Data as Immutable

A mutation is an in-place change to a value. An immutable value is a value that, once created, can never be changed. 

```javascript
// for example, the method push mutates the array it's called on
const x = [1, 2];
console.log( x ); // [1, 2]

x.push( 3 );
console.log( x ); // [1, 2, 3]
```

Why would we want to avoid mutable data?

A mutation is a side effect and, as already noted, a fundamental principle of functional programming is the minimisation of side effects. The fewer things that change in a program, the less there is to keep track of, and the result is a simpler program. 

In JavaScript, simple values like numbers, strings and booleans are immutable. However, data structures like objects and arrays are mutable. 

Object immutability can be enforced with `Object.freeze`, but only one level deep:

```javascript
const frozenObject = Object.freeze( { valueOne : 1, valueTwo : { nestedValue : 1 } } );
frozenObject.valueOne = 2; // not allowed
frozenObject.valueTwo.nestedValue = 2; // allowed!
```

You can enforce immutability either by writing your own freezing functions or by using a library like [Immutable](https://facebook.github.io/immutable-js/), but in most cases it's enough to simply treat data as though it were immutable.

### Avoiding Mutations: Arrays

Array methods in JavaScript can broadly be divided into [mutator methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype#Mutator_methods) and non-mutator methods. Treat arrays as immutable by avoiding mutator methods.

For example, instead of using the mutating `push` method, you can use `concat`, which returns a new array comprised of the array it was called on and the array provided as its argument.

```javascript
// push mutates arrays.
const arrayOne = [1, 2, 3];
arrayOne.push( 4 );

console.log( arrayOne ); // [1, 2, 3, 4]

// concat creates a new array and leaves the original one unchanged.
const arrayTwo = [1, 2, 3];
const arrayThree = arrayTwo.concat([ 4 ]);

console.log( arrayTwo ); // [1, 2, 3]
console.log( arrayThree ); // [1, 2, 3, 4]
```

Other useful non-mutator array methods include [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), and [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

### Avoiding Mutations: Objects

Instead of directly editing objects, you can use [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), which copies the properties of source objects into a target object and then returns it. If you always use an empty object as the target object, you can use `Object.assign` to avoid directly editing objects.

```javascript
const objectOne = { valueOne : 1 };
const objectTwo = { valueTwo : 2 };

const objectThree = Object.assign( {}, objectOne, objectTwo );

console.log( objectThree ); // { valueOne : 1, valueTwo : 2 }
```

### Note on `const`

`const` is useful, but it does not make your data immutable. It prevents your variables from being reassigned. These two things should not be conflated.

```javascript
const x = 1;
x = 2; // not allowed

const myArray = [1, 2, 3];
myArray = [0, 2, 3]; // not allowed

myArray[0] = 0; // allowed!
```

## Recursion

A *recursive* function is a function that calls itself until it reaches a base condition. Recursive functions can be a good alternative to loops when you need to do something repeatedly. They're more declarative and readable than loops, at least once you're used to them. They're also elegant and very satisfying to write!

Here's an example of a function that recursively calculates the factorial of a number:

```javascript
const factorial = function ( n ) {
	if ( n === 0 ) {
		return 1;
	}
	return n * factorial( n - 1 );
};

console.log(factorial( 10 )); // 3628800
```

Using recursive functions in JavaScript requires some care. Every function call adds a new call frame to the call stack, and that call frame is popped off the call stack when the function returns. Recursive functions call themselves before they return, and so it's very easy for a recursive function to exceed the limits of the call stack and crash the program.

However, this can be avoided with *tail call optimisation*.

### Tail Call Optimisation

A tail call is a function call that is the last action of a function. Tail call optimisation is when the language compiler recognises tail calls and reuses the same call frame for them. This means that if you write recursive functions with tail calls, the limits of the call stack will never be exceeded by them as it will reuse the same frame over and over.

Here is the recursive function from above rewritten to take advantage of tail call optimisation:

```javascript
const factorial = function ( n, base ) {
	if ( n === 0 ) {
		return base;
	}
	base *= n;
	return factorial( n - 1, base );
};

console.log(factorial( 10, 1 )); // 3628800
```

Support for proper tail calls is included in the [ES2015 language specification](http://www.ecma-international.org/ecma-262/6.0/#sec-tail-position-calls), but is currently unsupported in most environments. You can keep up to date [here](https://kangax.github.io/compat-table/es6/).


## Resources

### General

+ [SitePoint: An Introduction to Functional JavaScript](https://www.sitepoint.com/series/introduction-functional-javascript/)
+ [John Hughes: Why Functional Programming Matters](http://www.cs.utexas.edu/~shmat/courses/cs345/whyfp.pdf)
+ [Vasily Vasinov: 16 Months of Functional Programming](http://www.vasinov.com/blog/16-months-of-functional-programming/)
+ [Stephen Young: Functional programming with Javascript](http://stephen-young.me.uk/2013/01/20/functional-programming-with-javascript.html)
+ [James Sinclair: A Gentle Introduction to Functional JavaScript](http://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-intro/)

### Side Effects

+ [Wikipedia: Side effect (computer science)](https://en.wikipedia.org/wiki/Side_effect_(computer_science))
+ [Stack Overflow: Are side effects a good thing?](http://stackoverflow.com/questions/763835/are-side-effects-a-good-thing)

### Pure Functions

+ [Redux: Pure and Impure Functions](https://egghead.io/lessons/javascript-redux-pure-and-impure-functions)

### Function Generation

+ [Eloquent JavaScript: Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)
+ [Scott Sauyet: Compose Yourself: Fun with Functions](http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-0)
+ [Vasily Vasinov: On Currying and Partial Function Application](http://www.vasinov.com/blog/on-currying-and-partial-function-application/)
+ [2ality: Currying versus partial application](http://www.2ality.com/2011/09/currying-vs-part-eval.html)

### Recursion

+ [Stack Overflow: What is recursion and when should I use it?](http://stackoverflow.com/questions/3021/what-is-recursion-and-when-should-i-use-it)
+ [Medium: Recursion](https://medium.com/functional-javascript/recursion-282a6abbf3c5#.i913o81g3)
+ [Kyle Owen: ES6 Tail Call Optimization Explained](http://benignbemine.github.io/2015/07/19/es6-tail-calls/)
+ [Don Taylor: Functional JavaScript – Tail Call Optimization and Trampolines](https://taylodl.wordpress.com/2013/06/07/functional-javascript-tail-call-optimization-and-trampolines/)
+ [Mark McDonnell: Understanding recursion in functional JavaScript programming](http://www.integralist.co.uk/posts/js-recursion.html)

### Declarative Programming

+ [Code Nugget: Declarative vs. Imperative Programming for the Web](http://codenugget.co/2015/03/05/declarative-vs-imperative-programming-web.html)
+ [Stack Overflow: What is the difference between declarative and imperative programming](http://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-programming)
+ [netguru: Imperative vs. Declarative Programming - Pros and Cons](https://www.netguru.co/blog/imperative-vs-declarative)

### Immutability

+ [Site Point: Immutability in JavaScript](https://www.sitepoint.com/immutability-javascript/)
+ [Auth0: Introduction to Immutable.js and Functional Programming Concepts](https://auth0.com/blog/2016/03/23/intro-to-immutable-js/)
+ [Stack Exchange: If immutable objects are good, why do people keep creating mutable objects?](http://programmers.stackexchange.com/questions/151733/if-immutable-objects-are-good-why-do-people-keep-creating-mutable-objects)
+ [Stack Overflow: Why is immutability so important(or needed) in javascript?](http://stackoverflow.com/questions/34385243/why-is-immutability-so-importantor-needed-in-javascript)
+ [React.js Conf 2015 - Immutable Data and React (video)](http://www.youtube.com/watch?v=I7IdS-PbEgI&t=14m8s)
+ [Redux: Avoiding Array Mutations with concat(), slice(), and ...spread (video)](https://egghead.io/lessons/javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread)
+ [Redux: Avoiding Object Mutations with Object.assign() and ...spread (video)](https://egghead.io/lessons/javascript-redux-avoiding-object-mutations-with-object-assign-and-spread)
+ [Mozilla Developer Network: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
+ [Mozilla Developer Network: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
+ [Mozilla Developer Network: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
+ [Mozilla Developer Network: Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

### In the Wild
+ [loadash](https://lodash.com/)
+ [Immutable](https://facebook.github.io/immutable-js/)
+ [Redux](http://redux.js.org/)
+ [Elm](http://elm-lang.org/) (Elm is a distinct, functional language that compiles to JavaScript)

