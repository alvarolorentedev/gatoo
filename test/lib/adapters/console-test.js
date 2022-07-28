global.console = {log: jest.fn()}

const { faker } = require('@faker-js/faker')
    adapter = require('../../../lib/adapters/console')

describe('console adapter', () => {
    it('exports console.log',async () => {
        let output = {data : {somestuff: faker.datatype.uuid()}}
        adapter(output)
        expect(console.log).toBeCalledWith(JSON.stringify(output.data))
    })
})