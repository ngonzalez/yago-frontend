import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['storeData']),

    // lists
    selectedCodes() {
      if (!this.storeData.selectedCodes) return;
      return this.storeData.selectedCodes;
    },
    hasSelectedCodes() {
      return this.storeData.selectedCodes &&
             this.storeData.selectedCodes.length > 0
    },
    
  },
};
