/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { subTo } from 'react-native-redash';
import { RFValue } from 'react-native-responsive-fontsize';
import AppTheme from '../styles/AppTheme';

const { OSsemiBold, OSregular } = AppTheme.fonts;
const { greyPrimary, greySecondary } = AppTheme.colors;

const PaymentDetailsBox2 = ({
  subTotal,
  total,
  actualPrice,
  rooms,
  roomsCount,
  days,
  tax,
  discount,
  packagesAddons,
  matressInfo = {},
  hiTeaInfo = {},
  isInstantBooking = false,
  isDialogShown = false,
  discountCodeDiscount,
}) => {
  const {
    isMatress,
    price: matressPrice,
    quantity: matressQuantity,
    days: matressDays,
  } = matressInfo;
  const {
    isHiTea,
    price: hiTeaPrice,
    quantity: hiTeaQuantity,
    days: hiTeaDays,
  } = hiTeaInfo;

  console.log('days in payment detail screen', days);

  const [isShowingDetail, setShowingDetail] = useState(false);

  let updatedSubTotal = subTotal;
  let updatedTax = tax;
  let _updatedSubTotal = subTotal;
  let discountPrice = 0;
  if (isMatress) {
    updatedSubTotal =
      Number(updatedSubTotal) + Number(matressPrice * matressDays);
    _updatedSubTotal =
      Number(_updatedSubTotal) + Number(matressPrice * matressDays);
  }

  if (isHiTea) {
    updatedSubTotal =
      Number(updatedSubTotal) + Number(hiTeaPrice * hiTeaQuantity);
    _updatedSubTotal =
      Number(_updatedSubTotal) + Number(hiTeaPrice * hiTeaQuantity);
  }
  if (isInstantBooking) {
    discountPrice = (Number(+updatedSubTotal) * Number(discount)) / 100;
    updatedSubTotal = updatedSubTotal - discountPrice;
  } else updatedTax = updatedSubTotal * 0.16;
  updatedTax = updatedSubTotal * 0.16;

  console.log('PackagesAddOns in PaymentDetailBox2 |=> ', packagesAddons);
  console.log(
    'PackagesAddOns in PaymentDetailBox2 |=> ',
    packagesAddons.length,
  );

  const renderPackagesAddOns = ({ item }) =>
    //console.log('item |||=> ', item.isChecked, item.adons.title);
    // console.log()
    item.isChecked && (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: RFValue(20),
          paddingTop: RFValue(12),
        }}>
        <Text>1 x {item.adons.title}</Text>
        <Text>{item.adons.price > 0 ? item.adons.price : 'Free'}</Text>
      </View>
    );

  return (
    <View>
      {isShowingDetail && (
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: RFValue(20),
              paddingTop: RFValue(12),
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {/* <Image
            source={require('../assets/bed.png')}
            style={{ ...styles.image, tintColor: greySecondary }}
          /> */}

              <Text style={styles.service}>
                {days > 1 ? days + ' x Nights' : days + ' x Night'}
              </Text>
            </View>
            <Text>{actualPrice}</Text>
          </View>
          {packagesAddons?.length > 0 && (
            <FlatList
              data={packagesAddons}
              renderItem={renderPackagesAddOns}
              keyExtractor={(item) => item.id}
            />
          )}
          {isMatress && (
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: RFValue(20),
                paddingTop: RFValue(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {/* <Image
            source={require('../assets/bed.png')}
            style={{ ...styles.image, tintColor: greySecondary }}
          /> */}

                <Text style={styles.service}>{'1 x Matress'}</Text>
              </View>
              <Text>
                {String(matressInfo?.price * matressDays).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
          )}
          {isHiTea && (
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: RFValue(20),
                paddingTop: RFValue(12),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {/* <Image
            source={require('../assets/bed.png')}
            style={{ ...styles.image, tintColor: greySecondary }}
          /> */}

                <Text style={styles.service}>
                  {hiTeaQuantity + ' x Hi Tea'}
                </Text>
              </View>
              <Text>
                {String(hiTeaInfo?.price * hiTeaQuantity).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ',',
                )}
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: RFValue(20),
              paddingVertical: RFValue(8),
              borderBottomWidth: 1,
              borderBottomColor: greyPrimary,
            }}
          />
          {/*  <Image source={require('../assets/matress.png')} style={styles.image} />
          <Text style={styles.service2}>1 Mattress</Text>
          <Text>{'PKR    2,000'}</Text>
          </View> */}
          <View style={{
            paddingTop: RFValue(15),
          }} />
          {
            (discountCodeDiscount > 0) && <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: RFValue(20),
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Discount</Text>
              <Text style={styles.text}>
                {discountCodeDiscount}
              </Text>
            </View>
          }

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: RFValue(20),
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text}>Subtotal</Text>
            <Text style={styles.text}>
              {String(/*_updatedSubTotal*/ subTotal).replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ',',
              )}
            </Text>
          </View>
          {discount > 0 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: RFValue(20),
                  paddingVertical: RFValue(8),
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.text}>Discount</Text>
                <Text style={styles.text}>
                  {
                    String(discount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    /*`${
                  isInstantBooking
                    ? String(
                        parseFloat(discount)
                          .toFixed()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                      )
                    : '0'
                  }` discount*/
                  }
                  %
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: RFValue(20),
                  borderBottomWidth: 1,
                  borderBottomColor: greyPrimary,
                  justifyContent: 'space-between',
                  paddingBottom: RFValue(10),
                }}>
                <Text style={styles.text}>Discount Price</Text>
                <Text style={styles.text}>
                  {Math.floor((subTotal * Number(discount)) / 100)}
                </Text>
              </View>
            </>
          )}
          <View style={{
            borderBottomWidth: 1,
            borderBottomColor: greyPrimary
          }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: RFValue(20),
                justifyContent: 'space-between',
                paddingBottom: RFValue(10),
              }}>
              <Text style={styles.text}>Tax GST (16%)</Text>
              <Text style={styles.text}>
                {String(
                  parseFloat(/*updatedTax*/ Math.floor(tax))
                    .toFixed()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                )}
              </Text>
            </View>


          </View>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: RFValue(20),
          paddingVertical: RFValue(5),
          flex: 3,
        }}>
        <Text style={{ ...styles.text, flex: 1 }}>Total</Text>
        <TouchableOpacity
          onPress={() => setShowingDetail(!isShowingDetail)}
          style={{ padding: RFValue(5), flex: 1 }}>
          <Image
            source={require('../assets/cdown_black.png')}
            style={{
              transform: [{ rotate: isShowingDetail ? '180deg' : '0deg' }],
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>

        <Text style={{ ...styles.text, flex: 1, textAlign: 'right' }}>
          {
            'USD    ' + String(Math.floor(total)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            /*String(
              parseFloat(
                +updatedTax +
                  +updatedSubTotal -
                  (subTotal * Number(discount)) / 100,
              )
                .toFixed()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              )*/
          }
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: RFValue(20),
          paddingVertical: RFValue(4),
          borderBottomWidth: 1,
          borderBottomColor: greyPrimary,
        }}
      />
    </View>
  );
};

export default PaymentDetailsBox2;

const styles = StyleSheet.create({
  image: {
    width: RFValue(20),
    height: RFValue(20),
    marginRight: RFValue(10),
  },

  text: {
    fontFamily: OSregular,
    fontSize: RFValue(12),
    alignSelf: 'center',
  },
});
