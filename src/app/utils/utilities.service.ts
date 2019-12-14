import { isNullOrUndefined } from 'util';

export function checkNotEmpty(value: string) {
  if (value !== null && value !== undefined && value !== '') {
    return true;
  } else {
    return false;
  }
}

export function isNullOrEmpty(value: any): boolean {
  let result = isNullOrUndefined(value);
  if (!result && value === '') {
    result = true;
  }
  return result;
}
