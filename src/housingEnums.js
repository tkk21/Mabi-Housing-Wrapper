// SearchType: Item Name=4, Item Price=5, Seller=1, Ad Keyword=2
let SearchTypeEnum = {"itemName":4, "itemPrice":5, "seller":1, "adKeyword":2};
Object.freeze(SearchTypeEnum);
// SortType: Seller=1, Item=4, Item Price=5
let SortTypeEnum = {"seller":1, "item":4, "itemPrice":5, "price":5};
Object.freeze(SortTypeEnum);
// SortOption: Ascending=1, Descending=2
let SortOptionEnum = {"ascending":1, "descending":2, "asc":1, "desc":2};
Object.freeze(SortOptionEnum);
// Server: , Alexina=mabius4
let ServerEnum = {"alexina":"mabius4"}

module.exports.SearchTypeEnum = SearchTypeEnum;
module.exports.SortTypeEnum = SortTypeEnum;
module.exports.SortOptionEnum = SortOptionEnum;