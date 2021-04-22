


    export const calcRatio = function(rateFrom, rateTo){
const rateFromBig = new BigNumber(rateFrom);
const rateToBig = new BigNumber(rateTo);

let ratio = new BigNumber(rateFromBig.div(rateToBig ));
//console.log('wynik',ratio.integerValue());

console.log(ratio.valueOf());
return ratio.toNumber().toFixed(4).valueOf();

    }


    
export const calcFinalResult = function(ratio, inputValue){
const ratioBig = new BigNumber(ratio);
const inputBig =  new BigNumber(inputValue);
const result = new BigNumber(ratioBig.multipliedBy(inputBig));
return result.toNumber().toFixed(2).valueOf();

}



  