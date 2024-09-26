const getWeekDates = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  const endOfWeek = new Date(date);

  // Nếu là thứ 2, không cần lấy quá khứ
  switch (dayOfWeek) {
    case 1:
      endOfWeek.setDate(date.getDate() + 6);
      break;
    case 2:
      startOfWeek.setDate(date.getDate() - 1);
      endOfWeek.setDate(date.getDate() + 5);
      break;
    case 3:
      startOfWeek.setDate(date.getDate() - 2);
      endOfWeek.setDate(date.getDate() + 4);
      break;
    case 4:
      startOfWeek.setDate(date.getDate() - 3);
      endOfWeek.setDate(date.getDate() + 3);
      break;
    case 5:
      startOfWeek.setDate(date.getDate() - 4);
      endOfWeek.setDate(date.getDate() + 2);
      break;
    case 6:
      startOfWeek.setDate(date.getDate() - 5);
      endOfWeek.setDate(date.getDate() + 1);
      break;
    case 0: // Chủ nhật
      startOfWeek.setDate(date.getDate() - 6);
      break;
    default:
      break;
  }

  const dates = [];
  for (let i = startOfWeek.getDate(); i <= endOfWeek.getDate(); i++) {
    dates.push(new Date(startOfWeek.setDate(i)).toISOString().split('T')[0]);
  }

  return dates;
};

export {getWeekDates};
