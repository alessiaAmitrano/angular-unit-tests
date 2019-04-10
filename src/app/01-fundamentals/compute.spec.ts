import { compute } from './compute';

describe('compute', () => {
    it('returns 0 if input is negative', () => {
        const result = compute(-1);
        expect(result).toBe(0);
    });
    it('should increment input if input is positive', () => {
        const result = compute(1);
        expect(result).toBe(2);
    });
});
