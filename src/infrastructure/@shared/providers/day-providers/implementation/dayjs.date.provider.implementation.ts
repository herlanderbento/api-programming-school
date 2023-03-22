import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import DayjsDateProviderInterface from '../interface/dayjs.date.provider.interface';

dayjs.extend(utc);

export default class DayjsDateProviderImplementation
  implements DayjsDateProviderInterface
{
  public dateNow(): Date {
    return dayjs().toDate();
  }
  
  public addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  public addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }

  public compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}
