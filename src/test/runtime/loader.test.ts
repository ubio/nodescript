import assert from 'assert';

import { Graph } from '../../main/model/Graph.js';
import { TestGraphLoader } from '../test-loader.js';

describe('GraphLoader', () => {

    it('loads modules by moduleName', async () => {
        const loader = new TestGraphLoader();
        const def = await loader.loadModule('Math.Add');
        assert.deepStrictEqual(def, {
            moduleName: 'Math.Add',
            label: 'Math.Add',
            labelParam: '',
            description: 'Computes a sum of two numbers.',
            keywords: ['math', 'add', 'plus', 'sum'],
            params: {
                a: { schema: { type: 'number' } },
                b: { schema: { type: 'number' } },
            },
            result: {
                schema: { type: 'number' }
            },
            cacheMode: 'auto',
            evalMode: 'auto',
            resizeMode: 'horizontal',
        });
    });

    it('loads all graph dependencies', async () => {
        const loader = new TestGraphLoader();
        await Graph.load(loader, {
            nodes: [
                { ref: 'Math.Add' },
                { ref: 'String' },
            ],
        });
        assert.strictEqual(loader.resolveModule('Math.Add').label, 'Math.Add');
        assert.strictEqual(loader.resolveModule('String').label, 'String');
    });

    it('allows graph node to resolve module definitions synchronously', async () => {
        const loader = new TestGraphLoader();
        const graph = await Graph.load(loader, {
            nodes: [
                {
                    id: 'node1',
                    ref: 'Math.Add',
                    props: [
                        { key: 'a', value: '12' },
                        { key: 'b', value: '21' },
                    ]
                }
            ],
        });
        const node = graph.getNodeById('node1');
        const def = node!.$module;
        assert.strictEqual(def.label, 'Math.Add');
    });

});
