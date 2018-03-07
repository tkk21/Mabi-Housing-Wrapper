
const http = require("http");
const parseString = require('xml2js').parseString;

let getHousingInfo = function(housingSearchCriteria, callback){
    if (!housingSearchCriteria.searchWord){
        return callback(new Error ('No search word given'), null);
    }
    formatHousingURL = function(searchCriteria){
        // SearchType: Item Name=4, Item Price=5, Seller=1, Ad Keyword=2
        // SortType: Seller=1, Item=4, Item Price=5, 
        // SortOption: Ascending=1, Descending=2
        return `http://mabihousing.nexon.net/MabinogiShopAdv/ShopAdvertise.asp?
            Name_Server=${searchCriteria.server?searchCriteria.server: 'mabius4'}&
            Page=${searchCriteria.page > 0?searchCriteria.page: 1}&
            Row=${searchCriteria.row > 0?searchCriteria.row: 8}&
            SearchType=${searchCriteria.searchType?searchCriteria.searchType:4}&
            SortType=${searchCriteria.sortType?searchCriteria.sortType:0}&
            SortOption=${searchCriteria.sortOption?searchCriteria.sortOption:1}&
            SearchWord=${searchCriteria.searchWord?searchCriteria.searchWord:''}`
    }
    let url = formatHousingURL(housingSearchCriteria).replace(/\s/g, "");
    console.log(url);
    http.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        
        res.on("end", () => {
            console.log(res.headers);
            if (!res.headers.location){
                return callback(new Error ('Nexon failed to redirect housing'), null);
            }
            let = redirectURL = "http://mabihousing.nexon.net/MabinogiShopAdv" + res.headers.location.substring(1);  
            console.log(redirectURL);
            callRedirect(redirectURL, callback);
        });
    });
}



let callRedirect = function(redirectURL, callback){
    http.get(redirectURL, res =>{
        res.setEncoding("ucs2");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", ()=>{
            parseResponse(body, callback);
        });
    });
}

let parseResponse = function(xmlBody, callback){
    parseString(xmlBody, function(err, result){
        // Count: flier count. doesn't matter
        // Comment: Ad String
        callback(null, result);
    });
}

module.exports.getHousingInfo = getHousingInfo;