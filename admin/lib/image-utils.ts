export function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export function reorderByIds<T>(
  items: T[],
  getId: (item: T) => string,
  orderedIds: string[],
) {
  const lookup = new Map(items.map((item) => [getId(item), item]));
  return orderedIds
    .map((id) => lookup.get(id))
    .filter((item): item is T => item !== undefined);
}

export function reorderArray<T>(items: T[], fromIndex: number, toIndex: number) {
  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}
