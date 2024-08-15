import API from '../utils/API';
import moment from "moment";
const convertDollarToCurrentCurrency = async (amoutInUsd, currency) => {
  if(currency =='USD')
  return amoutInUsd;
  let currencyObj = {};
    console.log('API.getLastUpdatedCurrencyObject()',API.getLastUpdatedCurrencyObject(),amoutInUsd)
    if (API.getLastUpdatedCurrencyObject() != '') {
      console.log('already dd')
      var tenmins = moment(API.getLastUpdatedCurrencyObject());
      var duration = moment.duration(moment().diff(tenmins));
      if (duration.asMinutes() > 10) {
        console.log('from api upper 10 mi')
        let response = await fetch('https://nishathotels.jt.crewlogix.com/api/v3/currency-conversion');
        let data = await response.json();
        API.setLastUpdatedCurrencyObject(moment())
        API.setLatestCurrencyObject(data.data)
        currencyObj=  data.data;
      } else {
        currencyObj =  API.getLatestCurrencyObject();
      }
    } else {
      console.log('api first tim')
      let response = await fetch('https://nishathotels.jt.crewlogix.com/api/v3/currency-conversion');
      let data = await response.json();
      API.setLastUpdatedCurrencyObject(moment())
      API.setLatestCurrencyObject(data.data)
      currencyObj =  data.data;
    }
  if (currencyObj.USD > currencyObj[currency]) {
    return parseInt(amoutInUsd / currencyObj[currency]);
  } else {
    return parseInt(amoutInUsd * currencyObj[currency]);
  }

}
const convertPkrToDollar = async (amoutInPkr) => {
  let response = await fetch('https://nishathotels.jt.crewlogix.com/api/v3/currency-conversion');
  let data = await response.json();
  let amount = amoutInPkr /data.data.PKR;
  return parseInt(amount)

}
module.exports = {
  convertDollarToCurrentCurrency,
  convertPkrToDollar
}