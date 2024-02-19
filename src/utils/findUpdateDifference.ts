export function findUpdateDifference<T>(original: T, updated: T): Partial<T> {
    if (!original) return updated;

    const changes: Partial<T> = {};

    for (const key in updated) {
        if (updated[key] !== original[key]) {
            changes[key] = updated[key];
        }
    }
    return changes;
}