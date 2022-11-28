
import Dexie, { Table } from 'dexie';
import { NoteFE, NoteBE } from '../models/note-types';

export class MyDatabase extends Dexie {

  notes!: Table<NoteFE | NoteBE>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      notes: '++id, name, text'
    });
  }
}

export const db = new MyDatabase();