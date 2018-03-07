const { formatRequestQuery, formatResponse } = require('../src/formatHousingArgs');
const { SearchTypeEnum, SortTypeEnum, SortOptionEnum } = require('../src/housingEnums');
expect = require('chai').expect;

generateExpected = function (){
	return Object.assign({}, {
		server: "mabius4",
		page: 1,
		row: 0,
		searchType: SearchTypeEnum.itemName,
		sortType: 0,
		sortOption: 1,
		searchWord: '',
		displayColor: false
	})
}

describe("Format Request Query", () =>{
	let housingSearchCriteria;
	let expected;
	beforeEach(()=>{
		expected = generateExpected();
	});
	afterEach(()=>{
		expected = generateExpected();
	});
	describe("Formats search word", ()=>{
		it("formats one word query", ()=>{
			let args = "dye".split(' ');
			expected.searchWord = "dye";
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it("formats two word query", ()=>{
			let args = "holy water".split(' ');
			expected.searchWord = "holy_water";
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it("formats no word query", ()=>{
			let args = "".split(' ');
			expected.searchWord = "";
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
	});

	describe("Formats sort order", ()=>{
		it("formats no flag", ()=>{
			let args = "wing".split(' ');
			expected.searchWord = "wing";
			expected.sortType = 0;
			expected.sortOption = 1;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it("formats sort type flag", ()=>{
			let args = "wing -sort price".split(' ');
			expected.searchWord = "wing";
			expected.sortType = SortTypeEnum.price;
			expected.sortOption = 1;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it("formats sort order flag", ()=>{
			// This input ends up being ignored by the housing module
			let args = "wing -sort desc".split(' ');
			expected.searchWord = "wing";
			expected.sortType = undefined;
			expected.sortOption = 1;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it("formats sort type and sort order flags", ()=>{
			let args = "wing -sort price desc".split(' ');
			expected.searchWord = "wing";
			expected.sortType = SortTypeEnum.price;
			expected.sortOption = SortOptionEnum.desc;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
	});
	describe("Formats top n results query", ()=>{
		it("formats no flag", ()=>{
			let args = "wing".split(' ');
			expected.searchWord = "wing";
			expected.row = 0;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it("formats top flag with positive integer input", ()=>{
			let args = "wing -top 5".split(' ');
			expected.searchWord = "wing";
			expected.row = 5;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it("formats top flag with negative integer input", ()=>{
			let args = "wing -top -5".split(' ');
			expected.searchWord = "wing";
			expected.row = -5;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it("formats top flag with positive double input", ()=>{
			let args = "wing -top 5.5".split(' ');
			expected.searchWord = "wing";
			expected.row = 5;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
	});
	describe("Formats combination of flags and search word length", ()=>{
		it("formats 2 word search word with top flag", ()=>{
			let args = "holy water -top 5".split(' ');
			expected.searchWord = "holy_water";
			expected.row = 5;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it('formats 2 word search word with sort flag', ()=>{
			let args = 'holy water -sort price desc'.split(' ');
			expected.searchWord = 'holy_water';
			expected.sortOption = SortOptionEnum.desc;
			expected.sortType = SortTypeEnum.price;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it('formats 2 word search word with top and sort flags', ()=>{
			let args = 'holy water -top 5 -sort price desc'.split(' ');
			expected.searchWord = 'holy_water';
			expected.row = 5;
			expected.sortOption = SortOptionEnum.desc;
			expected.sortType = SortTypeEnum.price;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it('formats 2 word search word with sort and top flags (other order)', ()=>{
			let args = 'holy water -sort price desc -top 5'.split(' ');
			expected.searchWord = 'holy_water';
			expected.row = 5;
			expected.sortOption = SortOptionEnum.desc;
			expected.sortType = SortTypeEnum.price;
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
	});
	describe("Special cases", ()=>{
		it('formats items with \' in it ', ()=>{
			let args = "Coco's Mini-Dress".split(' ');
			expected.searchWord = 'coco_s_mini-dress';
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
		it('formats items with () in it', ()=>{
			let args = 'flame patterned leather armor (f)'.split(' ');
			expected.searchWord = 'flame_patterned_leather_armor_(f)';
			housingSearchCriteria = formatRequestQuery(args);
			expect(housingSearchCriteria).to.deep.equal(expected);
		});
	});
});

describe("Format Response", () =>{

	beforeEach(()=>{
		
	});

	it('formats response', ()=>{
		let response = {
			'AdvertiseItems':{
				'ItemDesc':[
					{
						'$':{
							'Char_Name' : 'Player',
							'Item_Name' : 'Dye',
							'Item_Price' : '1000'
						}
					}
				]
			}
		};
		expected = `\`\`\`md\n  <Player> is selling * Dye *, for < 1,000 Gold >` + '\n\`\`\`';
		expect(formatResponse(response)).to.be.equal(expected);
	});
	
	it('formats empty response', ()=>{
		let response = {};
		expected = 'no suitable items returned';
		expect(formatResponse(response)).to.be.equal(expected);
	});

	it('formats response with color flag', ()=>{
		let response = {
			'AdvertiseItems':{
				'ItemDesc':[
					{
						'$':{
							'Char_Name' : 'Player',
							'Item_Name' : 'Dye',
							'Item_Price' : '1000',
							'Item_Color1' : '0',
							'Item_Color2' : '0',
							'Item_Color3' : '0',
						}
					}
				]
			}
		};
		expected = `\`\`\`md\n  <Player> is selling * Dye *, for < 1,000 Gold > Colors: 00000000, 00000000, 00000000` + '\n\`\`\`';
		expect(formatResponse(response, true)).to.be.equal(expected);
	});


});