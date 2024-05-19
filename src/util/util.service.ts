import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';
import {Moment} from 'moment';
// import moment from 'moment';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
// dayjs.extend(utc);

@Injectable()
export class UtilService {
  conversionToUNIX(time: Date) {
    const date = dayjs(time);
    const unixTmp = date.valueOf();
    return unixTmp;
  }

  conversionToLocalDate(time: Date | string) {
    return moment(time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
    // return dayjs.utc(time).local().format('YYYY-MM-DD HH:mm:ss')
  }
}
