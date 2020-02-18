import { expect } from 'chai';
import { _selectFilterOption } from '../src/add_new_filter__01';

let stubFilter, stubParentFilter, stubFilterOption, anotherStubFilterOption;

beforeEach(() => {
    stubFilter = {
        type: 'stub',
        selected: []
    };
    
    stubParentFilter = {};
    
    stubFilterOption = {
        code: '#stub-filter-option',
        description: 'Stub filter option for testing purposes',
        isDefault: true
    };
    
    anotherStubFilterOption = {
        code: '#another-stub-filter-option',
        description: 'Another stub filter option for testing multi-selection filter',
        isDefault: false
    };
});

describe('Test _selectFilterOption with stub filter options', () => {
    it('should add the stub option as selected when none option is yet selected', () => {
        stubFilterOption['isDefault'] = false;

        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(stubFilterOption['isDefault']);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });

    it('should not change when the same option is passed', () => {
        stubFilterOption['isDefault'] = false;

        stubFilter =_selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);
        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(stubFilterOption['isDefault']);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });

    it('should add the option as default when flag is passed as true', () => {

        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(stubFilterOption['isDefault']);
        expect(stubFilter['selected'][0]['option']).eql(stubFilterOption);
    });

    it('should set filter options as not active', () => {
        stubFilter['options'] = [
            { active: true },
            { active: true }
        ];

        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['options']).to.have.length(2);
        expect(stubFilter['options'][0]['active']).to.be.true;
        expect(stubFilter['options'][1]['active']).to.be.false;
    });
});

describe('Test _selectFilterOption with date filter options', () => {
    it('should add the option as date filter', () => {
        stubFilterOption['isDefault'] = false;
        stubFilter['type'] = 'date';

        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);

        expect(stubFilter['compDates']).to.be.undefined;
        expect(stubFilter['compType']).to.be.equal('commercial');

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(stubFilterOption['isDefault']);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });
});

describe('Test _selectFilterOption with multi selection filter', () => {
    beforeEach(() => {
        stubFilter['multiSelect'] = true;
    });

    it('should not add the first option if is not default', () => {
        stubFilterOption['isDefault'] = false;

        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(stubFilterOption['isDefault']);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });

    it('should remove an option if is already selected and not default', () => {
        stubFilterOption['isDefault'] = false;

        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);
        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(0);
    });

    it('should add a second selected option', () => {
        stubFilterOption['isDefault'] = false;

        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);
        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, anotherStubFilterOption);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(2);
        expect(stubFilter['selected'][0]['default']).to.be.equal(stubFilterOption['isDefault']);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
        expect(stubFilter['selected'][1]['default']).to.be.equal(anotherStubFilterOption['isDefault']);
        expect(stubFilter['selected'][1]['option']).to.eql(anotherStubFilterOption);
    });
    
    it('should not remove an option if is default', () => {
        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);
        stubFilter = _selectFilterOption(stubFilter, stubParentFilter, stubFilterOption);

        expect(stubFilter).to.have.property('selected');
        expect(stubFilter['selected']).to.have.length(1);
        expect(stubFilter['selected'][0]['default']).to.be.equal(stubFilterOption['isDefault']);
        expect(stubFilter['selected'][0]['option']).to.eql(stubFilterOption);
    });
});
