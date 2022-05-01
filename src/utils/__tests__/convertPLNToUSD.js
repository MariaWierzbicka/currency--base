import { convertPLNToUSD } from '../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when text input', () => {
    expect(convertPLNToUSD('2')).toBeNaN();
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('-500')).toBeNaN();
  });
  it('should return error when input not text or number', () => {
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
  });
  it('should return $0.00 when input < 0', () => {
    expect(convertPLNToUSD(-120)).toBe('$0.00');
    expect(convertPLNToUSD(-1.2)).toBe('$0.00');
    expect(convertPLNToUSD(-7822)).toBe('$0.00');
  });
});