interface UseSecureStoreItemOptions<T> {
  initialValue?: T;
}

declare function useSecureStoreItem<T>(
  key: string,
  options?: UseSecureStoreItemOptions<T>
): [T, (newValue: T) => void];

export default useSecureStoreItem;
