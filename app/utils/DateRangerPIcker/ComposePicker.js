import React, { Component } from 'react';
import { View, TouchableHighlight, Modal, Text } from 'react-native';
import PropTypes from 'prop-types';
import DateRange from './DateRange';
import moment from 'moment';
import normalize from './normalizeText';

const styles = {
  placeholderText: {
    color: '#c9c9c9',
    fontSize: normalize(18),
  },
  contentInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: normalize(18),
  },
  stylish: {
    height: 48,
    borderColor: '#bdbdbd',
    borderWidth: 2,
    borderRadius: 32,
  },
};
export default class ComposePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      allowPointerEvents: true,
      showContent: false,
      selected: '',
      startDate: null,
      endDate: null,
      date: new Date(),
      focus: 'startDate',
      currentDate: moment(),
    };
  }
  isDateBlocked = (date) => {
    if (this.props.blockBefore) {
      return date.isBefore(moment(), 'day');
    } else if (this.props.blockAfter) {
      return date.isAfter(moment(), 'day');
    }
    return false;
  };
  onDatesChange = (event) => {
    const { startDate, endDate, focusedInput, currentDate } = event;
    if (currentDate) {
      this.setState({ currentDate });
      return;
    }
    this.setState({ ...this.state, focus: focusedInput }, () => {
      this.setState({ ...this.state, startDate, endDate });
    });
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  onConfirm = () => {
    const returnFormat = this.props.returnFormat || 'YYYY/MM/DD';
    const outFormat = this.props.outFormat || 'LL';
    if (!this.props.mode || this.props.mode === 'single') {
      this.setState({
        showContent: true,
        selected: this.state.currentDate.format(outFormat),
      });
      this.setModalVisible(false);
      if (typeof this.props.onConfirm === 'function') {
        this.props.onConfirm({
          currentDate: this.state.currentDate.format(returnFormat),
        });
      }
      return;
    }
    if ((this.state.startDate && this.state.endDate) && (this?.state?.startDate?.toString() == this?.state?.endDate?.toString())) {
      alert('Check in and Check out dates cannot be same');
    }
    else if (this.state.startDate && this.state.endDate) {
      console.log(this.state.startDate, this.state.endDate)
      const start = this.state.startDate.format(outFormat);
      const end = this.state.endDate.format(outFormat);
      this.setState({
        showContent: true,
        selected: `${start} ${this.props.dateSplitter} ${end}`,
      });
      this.setModalVisible(false);

      if (typeof this.props.onConfirm === 'function') {
        this.props.onConfirm({
          startDate: this.state.startDate.format(returnFormat),
          endDate: this.state.endDate.format(returnFormat),
        });
      }
    } else {
      alert('Check in and Check out dates cannot be empty');
    }
  };
  getTitleElement() {
    const { placeholder, customStyles = {}, allowFontScaling } = this.props;
    const showContent = this.state.showContent;
    if (!showContent && placeholder) {
      return (
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.placeholderText, customStyles.placeholderText]}>
          {placeholder}
        </Text>
      );
    }
    return (
      <Text
        allowFontScaling={allowFontScaling}
        style={[styles.contentText, customStyles.contentText]}>
        {this.state.selected}
      </Text>
    );
  }

  renderButton = () => {
    const { customButton } = this.props;

    if (customButton) {
      return customButton(this.onConfirm);
    }
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        onPress={this.onConfirm}
        style={[
          { width: '80%', marginHorizontal: '3%' },
          this.props.ButtonStyle,
        ]}>
        <Text style={[{ fontSize: 20 }, this.props.ButtonTextStyle]}>
          {this.props.ButtonText ? this.props.ButtonText : '送出'}
        </Text>
      </TouchableHighlight>
    );
  };

  render() {
    const { customStyles = {}, renderBottom } = this.props;

    let style = styles.stylish;
    style = this.props.centerAlign ? { ...style } : style;
    style = { ...style, ...this.props.style };

    return (
      <View style={{ height: '100%' }}>
        <DateRange
          headFormat={this.props.headFormat}
          customStyles={customStyles}
          markText={this.props.markText}
          onDatesChange={this.onDatesChange}
          isDateBlocked={this.isDateBlocked}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focus}
          selectedBgColor={this.props.selectedBgColor || undefined}
          selectedTextColor={this.props.selectedTextColor || undefined}
          mode={this.props.mode || 'single'}
          currentDate={this.state.currentDate}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          {renderBottom(this.onConfirm, this.state)}
        </View>
      </View>
    );
  }
}

ComposePicker.propTypes = {
  dateSplitter: PropTypes.string,
};

ComposePicker.defaultProps = { dateSplitter: '->' };
