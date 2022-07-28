jest.mock('../../lib/importer', () => jest.fn())

const importer = require('../../lib/importer'),
    exporter = require('../../lib/exporter'),
    { faker } = require('faker')

describe('exporter', () => {
    it('exports google analytics data adapter',async () => {
        const email = faker.internet.email(),
        path = `/some/file/path/${faker.datatype.uuid()}.conf`,
        config = { config: faker.datatype.uuid() },
        expectedResult = faker.datatype.uuid()
        adapter = jest.fn()
        
        importer.mockImplementation(() => Promise.resolve(expectedResult))

        await exporter(email,path,config, adapter)

        expect(importer).toBeCalledWith(email,path,config)
        expect(adapter).toBeCalledWith(expectedResult)
    })
})