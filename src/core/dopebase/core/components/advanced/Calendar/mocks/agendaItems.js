import isEmpty from 'lodash/isEmpty';
import {getWeekDates} from '../../../../../../helpers/getWeekDates';

const today = new Date().toISOString().split('T')[0];
const pastDate = getPastDate(0);
const futureDates = getFutureDates(8);
// Lấy chuỗi ngày tuyến tính
const dates = [pastDate, today, ...futureDates];
// Lấy chuỗi ngày tuần
const weekDates = getWeekDates();

function getFutureDates(numberOfDays) {
  return Array.from({length: numberOfDays}, (_, index) => {
    const date = new Date(Date.now() + 864e5 * (index + 1)); // 864e5 == 86400000 == 24*60*60*1000
    return date.toISOString().split('T')[0];
  });
}

function getPastDate(numberOfDays) {
  return new Date(Date.now() - 864e5 * numberOfDays)
    .toISOString()
    .split('T')[0];
}

export const agendaItems = [
  {
    title: weekDates[0],
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Hệ Phương Trình Tuyến Tính',
        class: 'Lớp 10A',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Phương Trình Bậc 2',
        class: 'Lớp 10A',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Giải Phương Trình Bất Đẳng Thức',
        class: 'Lớp 10A',
      },
    ],
  },
  {
    title: weekDates[1],
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Phương Trình Bậc Nhất',
        class: 'Lớp 10B',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Phương Trình Bậc 2',
        class: 'Lớp 10B',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Giải Phương Trình Bất Đẳng Thức',
        class: 'Lớp 10B',
      },
    ],
  },
  {
    title: weekDates[2],
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Hàm Số Tuyến Tính',
        class: 'Lớp 11A',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Hàm Số Bậc 2',
        class: 'Lớp 11A',
      },
    ],
  },
  {
    title: weekDates[3],
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Hệ Phương Trình Tuyến Tính',
        class: 'Lớp 11B',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Phương Trình Bậc 2',
        class: 'Lớp 11B',
      },
    ],
  },
  {
    title: weekDates[4],
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Phương Trình Bậc 3',
        class: 'Lớp 12A',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Hàm Số Bậc Cao',
        class: 'Lớp 12A',
      },
      {
        hour: '09:00',
        duration: '45p',
        title: 'Tiết 3: Ứng Dụng Hàm Số',
        class: 'Lớp 12A',
      },
    ],
  },
  {
    title: weekDates[5],
    data: [
      {
        hour: '07:00',
        duration: '45p',
        title: 'Tiết 1: Hình Học Không Gian',
        class: 'Lớp 12B',
      },
      {
        hour: '08:00',
        duration: '45p',
        title: 'Tiết 2: Hình Học Tọa Độ',
        class: 'Lớp 12B',
      },
    ],
  },
  {
    title: weekDates[6],
    data: [{}],
  },
];

export function getMarkedDates() {
  return agendaItems.reduce((marked, item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = {marked: true};
    } else {
      marked[item.title] = {disabled: true};
    }
    return marked;
  }, {});
}
