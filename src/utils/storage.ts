export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
    console.log(`${key} 저장 완료`);
  } catch (error) {
    console.error('로컬 스토리지 저장 중 오류 발생:', error);
  }
}

export function getFromLocalStorage(key: string) {
  try {
    const jsonValue = localStorage.getItem(key);
    if (!jsonValue) {
      console.warn(`${key}에 해당하는 데이터가 없습니다.`);
      return null;
    }
    return JSON.parse(jsonValue);
  } catch (error) {
    console.error('로컬 스토리지에서 데이터 가져오는 중 오류 발생:', error);
    return null;
  }
}

export const measureKey = 'measureResult';
export const recommendKey = 'recommendResult';
