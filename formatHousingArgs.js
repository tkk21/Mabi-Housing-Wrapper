const { SearchTypeEnum, SortTypeEnum, SortOptionEnum } = require("./housingEnums");
const leftpad = require("./lib/leftpad");
const sortFlag = '-sort';
const topFlag = '-top';
const colorFlag = '-color';
formatRequestQuery = function (args){
        console.log(args);
        // TODO handle args better
        if (!args || args.length < 1){
            return message.reply("You must provide an item name to search");
        }

        args = args.map((x) => {return x.toLowerCase();});
        
        let sortType = 0;
        let sortOption = 1;
        let sortIndex = args.indexOf(sortFlag);
        if (sortIndex > -1){
            if (sortIndex + 1 < args.length){
                sortType = SortTypeEnum[args[sortIndex + 1]];
            }
            if (sortIndex + 2 < args.length){
                sortOption = SortOptionEnum[args[sortIndex + 2]];
            }
        }
        let row = 0;
        let rowIndex = args.indexOf(topFlag, 1);
        if (rowIndex > -1 && rowIndex + 1 < args.length){
            row = parseInt(args[rowIndex + 1]);
            row > 0 ? row : 0;
        }

        let isColorRequested = args.indexOf(colorFlag) == -1 ? false : true;
    
        let itemNameEndIndex = args.findIndex(s => s[0] == "-") 
        itemNameEndIndex = itemNameEndIndex == -1 ? Number.MAX_SAFE_INTEGER : itemNameEndIndex;
        itemNameEndIndex == Number.MAX_SAFE_INTEGER ? args.length : itemNameEndIndex;
        let itemName = args.slice(0, itemNameEndIndex).join('_').replace("\'", "_");
    
        let housingSearchCriteria = {
            server: "mabius4",
            page: 1,
            row: row,
            searchType: SearchTypeEnum.itemName,
            sortType: sortType,
            sortOption: sortOption,
            searchWord: itemName,
            displayColor: isColorRequested
        };
    
        console.log(`housingSearchCriteria: ${JSON.stringify(housingSearchCriteria)}`);
        return housingSearchCriteria;
}

formatResponse = function(response, isColorRequested){
    if (!response || !response.AdvertiseItems){
        return 'no suitable items returned';
    }
    let str="";
    var nf = new Intl.NumberFormat();
    response.AdvertiseItems.ItemDesc.forEach(
        (val, currentIndex, listObj) => {
            str += `\`\`\`md\n  <${val.$.Char_Name}> is selling * ${val.$.Item_Name} *, for < ${nf.format(val.$.Item_Price)} Gold >${_formatColor(val.$.Item_Color1, val.$.Item_Color2, val.$.Item_Color3, isColorRequested)}` + '\n\`\`\`';
        }
    );
    
    return str;
}

_formatColor = function(color1, color2, color3, colorFlag){
    if (!colorFlag){
        return "";
    }
    let [hex1, hex2, hex3] = [color1, color2, color3].map(s=>parseInt(s).toString(16)).map(s=>leftpad(s, 8, '0'));
    return ` Colors: ${hex1}, ${hex2}, ${hex3}`;
}

module.exports.formatRequestQuery = formatRequestQuery;
module.exports.formatResponse = formatResponse;