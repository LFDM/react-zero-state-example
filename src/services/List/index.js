export const getNext = (items, item, { wrap = true } = {}) => {
    const first = items[0];
    if (item === undefined) {
        return first;
    }
    const i = items.indexOf(item);
    if (i === -1) {
        return null;
    }
    const nextItem = items[i + 1];
    if (nextItem === undefined) {
        return wrap ? first : items[i];
    }
    return nextItem;
}

export const getPrevious = (items, item, { wrap = true } = {}) => {
    const last = items[items.length - 1];
    if (item === undefined) {
        return last;
    }
    const i = items.indexOf(item);
    if (i === -1) {
        return null;
    }
    if (i === 0) {
        return wrap ? last : items[0];
    }
    return items[i - 1];
}

