# system-lite
Lightweight system.js implementation for use with e.g. TypeScript "system" modules.

`system-lite` does not load JavaScript modules dynamically. All script must be included using `<script src="..."`-tags. 

## Usage with TypeScript

`system-lite` is designed to be used in small projects where you want minimal build configuration and want to be able to get up and running quick.

In your `tsconfig.json`, specify these parameters:

```json
{
    "compilerOptions": {
        "out": "application.js",
        "module": "system"
    }
}
```

In your html file, include `system-lite` and the TypeScript output:

```html
    <script src="path/to/system-lite.js"></script>
    <script src="application.js"></script>
```

And at the end of your `<body>`, require your startup module:


```html
    ...
    <script>
        System.require('index');
    </script>
</body>
```

## Features

 * Load modules syncronously using `System.require('myModule')`. 
 * Load modules asyncronously using `System.import('myModule')`. This enables TypeScript 2.4 asyncronous import statement.
