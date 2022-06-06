import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['storeData']),

    // lists
    selectedCodes() {
      if (!this.storeData.codes) return;
      return this.storeData.codes;
    },
    hasSelectedCodes() {
      return this.storeData.codes &&
             this.storeData.codes.length > 0
    },
    
  },
};
