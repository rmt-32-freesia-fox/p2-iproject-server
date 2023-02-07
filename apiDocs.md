# HLR-Auction API Documentation

&nbsp;

## Models :

_User_

```
- email     : string, required, unique
- name      : string, required,
- password  : string, required,
```

_Auction_

```
UserId       : integer, required
name         : string, required
category     : string, required
color        : string, required
startPrice   : integer, required
multiple     : integer, required
startTime    : date, required
finishTime   : date, required
finishPrice  : integer, (default: "same as startprice")
winnerId     : integer
```

_Image_

```
UserId : integer, required
imageUrl : string, required
```
