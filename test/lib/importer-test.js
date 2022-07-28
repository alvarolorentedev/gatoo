jest.mock('../../lib/helpers/google-analytics', () => {
    return {
        login: jest.fn(),
        get: jest.fn()
    }
})

const importer = require('../../lib/importer'),
    analytics = require('../../lib/helpers/google-analytics'),
    { faker } = require('faker')

describe('import', () => {
    it('import from google analytics',async () => {
        const email = faker.internet.email(),
            path = `/some/file/path/${faker.datatype.uuid()}.conf`,
            jwtClient = { client: faker.datatype.uuid() },
            config = { config: faker.datatype.uuid() },
            expectedResult = faker.datatype.uuid()

        analytics.login.mockImplementation(() => jwtClient)
        analytics.get.mockImplementation(() => Promise.resolve(expectedResult))
        
        let result = await importer(email, path, config)

        expect(analytics.login).toBeCalledWith(email, path)
        expect(analytics.get).toBeCalledWith(jwtClient, config)
        expect(result).toEqual(expectedResult)
    })
})