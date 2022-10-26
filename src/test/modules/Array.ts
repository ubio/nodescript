import { ModuleCompute, ModuleDefinition } from '../../main/types/index.js';

type P = {
    items: any[];
};

type R = any[];

export const module: ModuleDefinition<P, R> = {
    moduleId: 'Array',
    version: '1.0.0',
    label: 'Array',
    description: 'Creates an array.',
    params: {
        items: {
            schema: {
                type: 'array',
                items: {
                    type: 'any',
                },
            }
        },
    },
    result: {
        schema: {
            type: 'array',
            items: { type: 'any' },
        },
    },
};

export const compute: ModuleCompute<P, R> = params => {
    return params.items;
};
