export const setFilterOption = (filter, parentFilter, option) => {
    let filterCopy = { ...filter }; // Copy object to avoid side-effects
    const selectedOption = { description: option.description, option, default: option['isDefault'] };

    const filterIsDate = filterCopy['type'] === 'date';
    const filterIsMultiselect = filterCopy.multiSelect;

    if (filterIsDate) {
        return _setDateFilter(filterCopy, selectedOption);
    } else if (filterIsMultiselect) {
        return _setMultiSelectionFilter(filterCopy, selectedOption, parentFilter);
    }

    return _setSingleSelectionFilter(filterCopy, selectedOption);
};

const _setDateFilter = (filter, selectedOption) => {
    const filterCopy = { ...filter };
    filterCopy.selected = [ selectedOption ];
    filterCopy.compDates = undefined;
    filterCopy.compType = 'commercial';

    return filterCopy;
};

const _setMultiSelectionFilter = (filter, selectedOption, parentFilter) => {
    let filterCopy = { ...filter };

    const previouslySelectedOptionsCount = filterCopy.selected.length;
    filterCopy = _unsetDuplicatedFilterOptions(filterCopy, selectedOption, parentFilter['key']);
    const optionWasUnset = previouslySelectedOptionsCount === filterCopy.selected.length;

    if (optionWasUnset || selectedOption['default']) {
        filterCopy.selected.push({
            ...selectedOption,
            filterId: parentFilter.id,
            filterKey: parentFilter.key,
            usableIn: parentFilter.usableIn
        });
    }

    return filterCopy;
};

const _unsetDuplicatedFilterOptions = (filter, selectedOption, parentKey) => {
    let filterCopy = { ...filter };

    filterCopy.selected = filterCopy.selected.filter(s => s.description !== selectedOption.description);
    filterCopy.selected = filterCopy.selected.filter(s =>{ 
        const optionIsParent = s.filterKey === parentKey;
        const optionIsSelected = s.option.code === selectedOption.code;
        return !optionIsParent || !optionIsSelected;
    });
    
    return filterCopy;
};

const _setSingleSelectionFilter = (filter, selectedOption) => {
    return { 
        ...filter,
        selected: [ selectedOption ],
        options: _resetFilterOptions(filter['options'])
    };
};

const _resetFilterOptions = (filterOptions = []) => {
    const optionsCopy = filterOptions.slice(1);
    optionsCopy.map(op => op.active = false);

    return optionsCopy;
};
