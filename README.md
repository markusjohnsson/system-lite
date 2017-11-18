# system-lite
Lightweight system.js implementation for use with e.g. TypeScript "system" modules.

## Features

 Designed to be used in small projects where you want minimal build configuration and want to be able to get up and running quickly. All you need is TypeScript's `tsc` and `system-lite`. Bundling is handled by TypeScript itself using "out" configration parameter. 

 * Load modules syncronously using `System.require('myModule')`. 
 * Load modules asyncronously using `System.import('myModule')`. This enables TypeScript 2.4 asyncronous import statement: `await import('myModule')`.
 * `system-lite` does *not* load JavaScript modules dynamically. All scripts must be included using `<script src="..."`-tags. 

Why not use globals? Using tsconfig parameters `'module':'system'` and `'out':'myapp.js'` is better than working with globals beacuse the output is order-independent. It also prepares your code for when you want to move to a full module system with several bundles and not just a single one.

## Usage with TypeScript


In your `tsconfig.json`, specify these parameters:

```json
{
    "compilerOptions": {
        "out": "application.js",
        "module": "system"
    }
}
```

In your HTML, include `system-lite` and the TypeScript output:

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

## Externals

If you need to load external modules you can use `registerExternal`:

```html

    <script src="react.js"></script>
    <script src="react-dom.js"></script>
    <script>
        System.registerExternal('react', React);
        System.registerExternal('react-dom', ReactDOM);
        System.require('index');
    </script>
</body>
```