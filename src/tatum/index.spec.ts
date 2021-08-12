import { getUsage } from './index'

describe('Test Tatum Service', () => {
    it('Test getUsage', async () => {
        const usage = await getUsage()
        expect(usage).not.toBeNull()
        expect(Array.isArray(usage)).toBe(true)
    });
});