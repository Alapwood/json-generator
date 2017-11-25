# json-generator

## Requirements

[Node.JS](https://nodejs.org/en/)

## Getting started

Run `npm install` to install the project's dependencies.

Run `node example.js` to start an example mock server.

## Template format

`json-generator` uses [Chance.js](http://chancejs.com/) to generate random data. Below are a few common templates, but you can use any [Chance.js](http://chancejs.com/) method.

```
{
  name: "{{firstName}} {{lastName}}",
  age: "{{age}}",
  something: "{{age type=child}}"
}
```
