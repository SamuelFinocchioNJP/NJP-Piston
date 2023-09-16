# NJP Piston Library

Interact with the Piston API using this lightweight JavaScript/TypeScript wrapper.

## Installation

Using npm:

```bash
npm install njp-piston
```

## Usage

To use the Piston library, follow the below steps:

1. Import the `piston` method:

```javascript
import { piston } from 'njp-piston';
```

2. Create an instance of Piston pointing to your Piston server:

```javascript
const pistonInstance = await piston("http://localhost:2000");
```

3. Use the available methods on the instance:

### Fetching Configuration

```javascript
console.log(pistonInstance.configuration);
```

### Getting Runtimes

```javascript
const runtimes = await pistonInstance.getRuntimes();
console.log(runtimes);
```

### Execute Source Code

In this example, we're executing a Python code that reads an input and prints a greeting:

```javascript
const result = await pistonInstance.executeSourceCode(
    "r = input()\nprint('Hello ' + r)", 
    "python", 
    "World!"
);
console.log(result);
```

## Example

Here's a complete example putting it all together:

```javascript
import { piston } from 'njp-piston';

(async () => {
    const pistonInstance = await piston("http://localhost:2000");

    console.log(pistonInstance.configuration);
    console.log(await pistonInstance.getRuntimes());
    console.log(await pistonInstance.executeSourceCode("r = input()\nprint('Hello ' + r)", "python", "World!"));
})();
```

## API Reference

Further API documentation can be found at the piston website [https://piston.readthedocs.io/en/latest/api-v2/](#).

## License

This library is released under the [MIT License](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt).