import moment from 'moment';
import 'moment/min/locales';
import Storage from '@react-native-async-storage/async-storage';

const date = new Date();
date.getTime() / 1000;

export const getLocale = async () => {
  try {
    const locale = await Storage.getItem('locale');
    if (locale !== null) {
      return locale.split('-')[0];
    }
  } catch (e) {
    console.log(e);
    return 'vi';
  }
};

export const timeFormat = timeStamp => {
  if (moment(timeStamp).isValid()) {
    if (moment().diff(moment.unix(timeStamp), 'days') === 0) {
      return moment.unix(timeStamp, ['hh:mm']).format('h:mm a'); // 3:20 pm
    } else if (moment().diff(moment.unix(timeStamp), 'days') < 7) {
      return moment.unix(timeStamp).format('ddd'); // Tue, Wed etc
    } else {
      return moment.unix(timeStamp).format('D MMM'); // 20 Jan
    }
  }
  return ' ';
};

export const getUnixTimeStamp = () => {
  return moment().unix();
};

export const getCurrentDateFormatted = new Promise((resolve, reject) => {
  const locale = getLocale();
  if (locale) {
    resolve(locale);
  } else {
    reject('vi');
  }
})
  .then(locale => {
    moment.locale(locale); // Đặt locale là tiếng Việt
    const currentDate = moment();
    return currentDate.format('dddd - DD/MM'); // Định dạng ngày theo yêu cầu
  })
  .catch(error => {
    console.error(error);
    return 'vi';
  });

export const getTimeDifference = (dateD, hour, timeMinute) => {
  const currentTime = new Date();
  const itemTime = new Date(dateD);
  itemTime.setHours(parseInt(hour.split(':')[0], 10));
  itemTime.setMinutes(parseInt(hour.split(':')[1], 10));

  const timeDifference = (itemTime - currentTime) / (1000 * timeMinute); // Chênh lệch thời gian tính bằng phút
  return timeDifference > 0 && timeDifference <= timeMinute; // Kiểm tra nếu thời gian chênh lệch nhỏ hơn hoặc bằng 60 phút
};

export const getTimeFuture = (dateD, hour) => {
  const currentTime = new Date();
  const itemTime = new Date(dateD);
  itemTime.setHours(parseInt(hour.split(':')[0], 10));
  itemTime.setMinutes(parseInt(hour.split(':')[1], 10));

  const timeDifference = itemTime - currentTime;
  return timeDifference > 0; // Kiểm tra nếu thời gian nếu nhỏ hơn 0 thì là thời gian trong quá khứ và ngược lại
};
