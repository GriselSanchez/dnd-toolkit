import { Stat } from '../types'

const STAT = {
  NAMES: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as (keyof Stat)[],
  MODIFIERS: [
    '-5',
    '-4',
    '-4',
    '-3',
    '-3',
    '-2',
    '-2',
    '-1',
    '-1',
    '0',
    '0',
    '+1',
    '+1',
    '+2',
    '+2',
    '+3',
    '+3',
    '+4',
    '+4',
    '+5',
    '+5',
    '+6',
    '+6',
    '+7',
    '+7',
    '+8',
    '+8',
    '+9',
    '+9',
    '+10',
  ],
}

export default STAT
