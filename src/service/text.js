import { get, post, downloadFile} from '../tools/network';

export default {


  //各种请求的样式


  getChargeSms(phone) {
    return post(' /api/charge/sendChargeSms', {
      phone,
    });
  },

  getAdvertisers({ id, name, pageNo }) {
    return get('/api/advertisement/getAdvertisers', { id, name, pageNo });
  },
  // getAdvertisementPlan({
  //    advertiserId,
  //    id,
  //    pageNo,
  //    planName,
  //  }) {
  //   return get(' /api/advertisement/getAdvertisementPlan', {
  //     advertiserId,
  //     id,
  //     pageNo,
  //     planName,
  //   });
  // },

  exportExcel(params) {
    return downloadFile('/api/band/exportBandList', { ...params });
  },

}
