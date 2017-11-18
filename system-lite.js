/**
 * license: MIT
 * author: markus.johnsson@infviz.com
 */
var System;
(function (System) {
    var modules = {};
    var registers = {};
    function register(name, deps, factory) {
        registers[name] = {
            deps: deps,
            factory: factory
        };
    }
    System.register = register;
    function registerExternal(name, mod) {
        modules[name] = mod;
    }
    System.registerExternal = registerExternal;
    function require(name) {
        if (name in modules)
            return modules[name];
        return create(name);
    }
    System.require = require;
    function _import(name) {
        var result = require(name);
        return Promise.resolve(result);
    }
    window.require = require;
    function create(name) {
        if (!(name in registers))
            throw new Error("Cannot resolve '" + name + "'");
        var register = registers[name];
        var result = {};
        modules[name] = result;
        function exportImpl(n, impl) {
            result[n] = impl;
        }
        var innerFactory = register.factory(exportImpl, { id: name, "import": _import });
        for (var index = 0; index < register.deps.length; index++) {
            var dependency = register.deps[index];
            innerFactory.setters[index](require(dependency));
        }
        innerFactory.execute();
        return result;
    }
})(System || (System = {}));
