# Mabinogi Housing Board Client

This module calls the Housing Board API

## Housing Board Documentation

### Request
Base URL: http://mabihousing.nexon.net/MabinogiShopAdv/ShopAdvertise.asp?
#### Name_Server
- mabius4 is Alexina
#### Page
- The page to select in the board
#### Row
- The maximum search results to show
#### SearchType
- "itemName":4, 
- "itemPrice":5, 
- "seller":1, 
- "adKeyword":2
#### SortType
- "seller":1
- "item":4
- "itemPrice":5
#### SortOption
- "ascending":1
- "descending":2
#### SearchWord
- The name of the item to search

### Response

The response is in XML
```xml
<AdvertiseItems NextPage="0" NowPage="1">
            <ItemDesc Item_ID="22518874955804761" 
            Shop_Name="" Area="" Char_Name="Masterpuppet" Comment="" 
            Start_Time="63655660357422" Item_ClassId="19350" 
            Item_Name="Blessed Holy Guardian Angel Wings" Item_Price="7000000" 
            Item_Color1="15643187" Item_Color2="16777215" Item_Color3="16777215" Count="1000"/>
</AdvertiseItems>
```
#### NextPage
- 1 if there is a next page
- 0 if this is the last page
#### NowPage
- The page on the housing board the request is on
#### Item_ID
- id of the item
#### Shop_Name
- Unknown
#### Area
- Unknown. Maybe location of housing?
#### Char_Name
- Name of the character
#### Comment
- The note in the housing flier
#### Start_Time
- Unknown. Timestamp of the flier issue time?
#### Item_ClassId
- Unknown. The type of the item? like equipment/consumable
#### Item_Name
- Name of the item
#### Item_Price
- Price the seller is looking for
#### Item_Color1
- Integer representation of the red hex value?
#### Item_Color2
- Integer representation of the green hex value?
#### Item_Color3
- Integer representation of the blue hex value?
#### Count
- Number of fliers remaining. Not used by mabinogi.
