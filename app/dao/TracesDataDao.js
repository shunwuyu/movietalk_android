export default class TracesDataDao {
  constructor () {
  }
  loadTracesDataByRecentSearch() {
    return new Promise((resolve, reject) => {
      let tracesData = [];
      let total = 0;
      setTimeout(() => {
        resolve([
          {
            ShipperName: '京东快递',
            stateCN: '36998741122',
            logo: '',
            RecentTime: '2017/06/16  13:53:38'
          }
        ])
      },100)
    })
  }
}
