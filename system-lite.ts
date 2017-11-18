/**
 * license: MIT
 * author: markus.johnsson@infviz.com
 */
namespace System {
    export interface ModuleFactory {
        setters: Function[]; 
        execute: Function;
    }

    interface Register {
        deps: string[];
        factory: (exports, context) => ModuleFactory;
    }

    interface D<T> {
        [s: string]: T;
    }

    const modules = <D<any>>{ };
    const registers = <D<Register>>{ };

    export function register(name: string, deps: string[], factory: (exports, context) => ModuleFactory) {
        registers[name] = {
            deps: deps,
            factory: factory
        };
    }

    export function registerExternal(name: string, mod: any) {
        modules[name] = mod;
    }

    export function require(name: string) {
        if (name in modules)
            return modules[name];

        return create(name);
    }

    function _import(name: string) {
        var result = require(name);
        return Promise.resolve(result);
    }

    (<any>window).require = require;

    function create(name: string) {
        if (!(name in registers))
            throw new Error("Cannot resolve '" + name + "'");
        
        const register = registers[name];
        
        const result = {}; 

        modules[name] = result;

        function exportImpl(n: string, impl: any) {
            result[n] = impl;
        }

        const innerFactory = register.factory(exportImpl, { id: name, import: _import });

        for (var index = 0; index < register.deps.length; index++) {
            const dependency = register.deps[index];
            innerFactory.setters[index](require(dependency));
        }

        innerFactory.execute();

        return result;
    }
}
