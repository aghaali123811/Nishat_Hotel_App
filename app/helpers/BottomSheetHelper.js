const BottomSheetHelper = {
  openSheet: false,
  openNextTime() {
    this.openSheet = true;
  },
  notOpenNextTime() {
    this.openSheet = false;
  },
};
export default BottomSheetHelper;
