/**
 * Adds new filter to selected *** filter attribute ***.
 * 1. delete all coincidences from selected attribute
 * 2. if attribute lengths didn't change it means that we need to add new selection
 * 3. else if length change it means that we are working with a selected option and we have
 *  deleted one option from the attribute
 *
 * @param { any } filter object in wich we want to store or delete the option parentFilter
 * @param { any } option option selected by user
 * @param { string } type type of parent filter in order to have quick access to it
 * @param { boolean } defaultOpt flag setting the selection as screen's default option
 *
 * @version 1.0 2019-05-23 14:43:38 John Doe - First impl.
 */
export const _addNewFilter = (filter, parentFilter, option, type, defaultOpt) => {
    if (type === 'date') {
        filter.selected = [ { description: option.description, option, type, default: defaultOpt } ];
        filter.compDates = undefined;
        filter.compType = 'commercial';
    } else if (!filter.multiSelect) {
        filter.selected = [ { description: option.description, option, type, default: defaultOpt } ];
        if (filter.options) {
            filter.options.slice(1).forEach(op => op.active = false);
        }
    } else {
        const oldLength = filter.selected.length;
        filter.selected = filter.selected.filter(s => s.description !== option.description); // 1
        filter.selected = filter.selected.filter(s =>
            s.filterKey !== parentFilter.key
                ||
                ![].concat(s.option.code).reduce((acc, curr) => acc && [].concat(option.code).includes(curr), true)); // 1
        if (oldLength === filter.selected.length || defaultOpt) {
            filter.selected.push({
                description: option.description, filterId: parentFilter.id,
                option, type, filterKey: parentFilter.key, usableIn: parentFilter.usableIn,
                default: defaultOpt
            }); // 2
        } // 3
    }
};
