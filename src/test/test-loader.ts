import { StandardModuleLoader } from '../main/runtime/ModuleLoader.js';
import { ModuleSpecSchema } from '../main/schema/ModuleSpec.js';
import { ModuleSpec } from '../main/types/module.js';
import { runtime } from './runtime.js';

/**
 * Custom module loader for tests.
 *
 * Loads the module from out/test/defs directory using `await import`.
 * This is just to save hassle of pre-bundling test module definitions.
 */
export class TestModuleLoader extends StandardModuleLoader {

    override resolveModuleUrl(moduleId: string): string {
        return runtime.makeUrl(`/out/test/modules/${moduleId}.js`);
    }

    override resolveComputeUrl(moduleId: string): string {
        return runtime.makeUrl(`/out/test/modules/${moduleId}.js`);
    }

    protected override async fetchModule(url: string): Promise<ModuleSpec> {
        const { module } = await import(url);
        return ModuleSpecSchema.decode(module);
    }

}
