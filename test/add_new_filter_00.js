import { expect } from 'chai';
import { _addNewFilter } from '../src/add_new_filter__00';

const stubFilterType = 'stub';
let stubFilter, stubParentFilter, stubFilterOption, anotherStubFilterOption;

beforeEach(() => {
    stubFilter = {
        selected: []
    };
    
    stubParentFilter = {};
    
    stubFilterOption = {
        code: '#stub-filter-option',
        description: 'Stub filter option for testing purposes'
    };
    
    anotherStubFilterOption = {
        code: '#another-stub-filter-option',
        description: 'Another stub filter option for testing multi-selection filter'
    };
});

describe('Test _addNewFilter with stub filter options', () => {
    it('should add the stub option as selected when none option is yet selected', () => {
        const optionIsDefault = false;

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(optionIsDefault);
        expect(stubFilter['selected'][0]['type']).to.be.equal(stubFilterType);
        expect(stubFilter['selected'][0]['option']).to.be.equal(stubFilterOption);
    });

    it('should not change when the same option is passed', () => {
        const optionIsDefault = false;

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);
        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(optionIsDefault);
        expect(stubFilter['selected'][0]['type']).to.be.equal(stubFilterType);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });

    it('should add the option as default when flag is passed as true', () => {
        const optionIsDefault = true;

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(optionIsDefault);
        expect(stubFilter['selected'][0]['type']).to.be.equal(stubFilterType);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });

    it('should set filter options as not active', () => {
        const optionIsDefault = true;
        stubFilter['options'] = [
            { active: true },
            { active: true }
        ];

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['options']).to.have.length(2);
        expect(stubFilter['options'][0]['active']).to.be.true;
        expect(stubFilter['options'][1]['active']).to.be.false;
    });
});

describe('Test _addNewFilter with date filter options', () => {
    it('should add the option as date filter', () => {
        const optionIsDefault = false;
        const stubFilterType = 'date';

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter['compDates']).to.be.undefined;
        expect(stubFilter['compType']).to.be.equal('commercial');

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(optionIsDefault);
        expect(stubFilter['selected'][0]['type']).to.be.equal(stubFilterType);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });
});

describe('Test _addNewFilter with multi selection filter', () => {
    beforeEach(() => {
        stubFilter['multiSelect'] = true;
    });

    it('should not add the first option if is not default', () => {
        const optionIsDefault = false;

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(optionIsDefault);
        expect(stubFilter['selected'][0]['type']).to.be.equal(stubFilterType);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });

    it('should remove an option if is already selected', () => {
        const optionIsDefault = false;

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);
        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(0);
    });

    it('should add a second selected option', () => {
        const optionIsDefault = false;

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);
        _addNewFilter(stubFilter, stubParentFilter, anotherStubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(2);
        expect(stubFilter['selected'][0]['default']).to.be.equal(optionIsDefault);
        expect(stubFilter['selected'][0]['type']).to.be.equal(stubFilterType);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
        expect(stubFilter['selected'][1]['default']).to.be.equal(optionIsDefault);
        expect(stubFilter['selected'][1]['type']).to.be.equal(stubFilterType);
        expect(stubFilter['selected'][1]['option']).to.eql(anotherStubFilterOption);
    });
    
    it('should not remove an option if is default', () => {
        const optionIsDefault = true;

        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);
        _addNewFilter(stubFilter, stubParentFilter, stubFilterOption, stubFilterType, optionIsDefault);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(optionIsDefault);
        expect(stubFilter['selected'][0]['type']).to.be.equal(stubFilterType);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });
});
