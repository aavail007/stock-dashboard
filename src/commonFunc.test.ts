import { tranNumber } from 'commonFunc';
describe('common Function test', () => {
  it('金額簡化轉換', () => {
    expect(tranNumber(1000000)).toBe('100 萬');
    expect(tranNumber(73169213267)).toBe('731 億');
    expect(tranNumber(3000)).toBe('3000');
  });
});
