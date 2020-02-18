export const _selectFilterOption = (filter, parentFilter, option) => {
    let filterCopy = { ...filter }; // Copy object to avoid side-effects
    const selectedOption = { description: option.description, option, default: option['isDefault'] };

    if (filter['type'] === 'date') {
        filterCopy.selected = [ selectedOption ];
        filterCopy.compDates = undefined;
        filterCopy.compType = 'commercial';
    } else if (!filterCopy.multiSelect) {
        filterCopy.selected = [ selectedOption ];
        if (filterCopy.options) {
            filterCopy.options.slice(1).forEach(op => op.active = false);
        }
    } else {
        const oldLength = filterCopy.selected.length;
        filterCopy.selected = filterCopy.selected.filter(s => s.description !== option.description);
        filterCopy.selected = filterCopy.selected.filter(s =>
            s.filterKey !== parentFilter.key
                ||
                ![].concat(s.option.code).reduce((acc, curr) => acc && [].concat(option.code).includes(curr), true));

        const optionWasUnset = oldLength === filterCopy.selected.length;
        if (optionWasUnset || option['isDefault']) {
            selectedOption['filterId'] = parentFilter.id;
            selectedOption['filterKey'] = parentFilter.key;
            selectedOption['usableIn'] = parentFilter.usableIn;

            filterCopy.selected.push(selectedOption);
        }
    }

    return filterCopy;
};

// 1- Make function name more expressive
// 2- Remove unnecessary comments
// 3- Make function pure and avoid side effects
// 4- Reduce function arguments
