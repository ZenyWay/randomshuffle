/*
 * Copyright 2016 Stephane M. Catala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * Limitations under the License.
 */
;
import getRandomWords from 'randomwords'

export interface ShuffleFactorySpecs {
  randomwords: (length: number) => Uint16Array
}

export default function getShuffle (opts?: Partial<ShuffleFactorySpecs>) {
  const randomwords = opts && opts.randomwords || getRandomWords()

  return function shuffle <T>(arr: T[]): T[] {
    if (!isValidArray(arr)) { throw new TypeError('invalid argument') }

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    return randomwords(arr.length - 1) // shuffle all _pairs_
    .reduceRight((shuffled: T[], rnd: number, index: number) => {
      const i = index + 1 // one more array element then pairs
      const j = rnd ? (rnd * (i + 1)) >> 16 : 0 // i is zero-based
      return swap(shuffled, i, j)
    }, arr.slice())
  }
}

function isValidArray (val: any): val is Array<any> {
  // length is limited to 32768 = half the random word range.
  return Array.isArray(val) && (val.length <= 32768)
}

function swap <T>(arr: T[], i: number, j: number): T[] {
  if (i === j) { return arr }
  const val = arr[j]
  arr[j] = arr[i]
  arr[i] = val
  return arr
}
