import dayjs from 'dayjs/esm';

import { StoreStatus } from 'app/entities/enumerations/store-status.model';

import { IStore, NewStore } from './store.model';

export const sampleWithRequiredData: IStore = {
  id: 9662,
  name: 'web Books',
  address: 'port Islands JSON',
  createTimestamp: dayjs('2022-10-19T20:18'),
};

export const sampleWithPartialData: IStore = {
  id: 36967,
  name: 'Fantastic Keyboard supply-chains',
  address: 'Gorgeous',
  createTimestamp: dayjs('2022-10-20T05:43'),
  updateTimestamp: dayjs('2022-10-19T20:19'),
};

export const sampleWithFullData: IStore = {
  id: 43072,
  name: 'SMS Response Fresh',
  address: 'Assistant navigating',
  status: StoreStatus['CLOSED'],
  createTimestamp: dayjs('2022-10-19T11:48'),
  updateTimestamp: dayjs('2022-10-20T05:24'),
};

export const sampleWithNewData: NewStore = {
  name: 'Avon',
  address: 'PCI firmware Sleek',
  createTimestamp: dayjs('2022-10-19T22:57'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
