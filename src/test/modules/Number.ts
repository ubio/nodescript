import { ModuleCompute, ModuleDefinition } from '../../main/types/index.js';

type P = { value: unknown };
type R = number;

export const module: ModuleDefinition<P, R> = {
    moduleId: 'Number',
    version: '1.0.0',
    label: 'Number',
    description: 'Converts the value into a number.',
    params: {
        value: {
            schema: {
                type: 'any'
            }
        },
    },
    result: {
        schema: {
            type: 'number',
        }
    }
};

export const compute: ModuleCompute<P, R> = params => {
    return Number(params.value);
};
