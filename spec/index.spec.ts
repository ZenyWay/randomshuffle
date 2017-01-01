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
import getShuffle from '../src'
import { __assign as assign } from 'tslib'

interface TestResult {
  value?: any
  error?: any
}

const result: TestResult = {}

beforeEach (() => {
  delete result.value
  delete result.error
})

describe('getShuffle (opts?: Partial<ShuffleFactorySpecs>): ' +
'<T>(arr: T[]) => T[]', () => {
  describe('when called without argument', () => {
    beforeEach(() => {
      try {
        result.value = getShuffle()
      } catch (err) {
        result.error = err
      }
    })

    it('returns the default `shuffle <T>(arr: T[]): T[]` function', () => {
      expect(result.error).toBeUndefined()
      expect(result.value).toEqual(jasmine.any(Function))
    })
  })
})

describe('shuffle <T>(arr: T[]): T[]', () => {
  describe('when given an Array instance with up to 32768 elements', () => {
    let arr: number[]
    let randomwords: jasmine.Spy

    beforeEach(() => {
      arr = [ 1, 2, 3, 4 ]
      randomwords = jasmine.createSpy('randomwords')
      .and.returnValue(new Uint16Array([ 65535, 65538 / 3, 0 ]))
      const shuffle = getShuffle()
      const mockedShuffle = getShuffle({ randomwords: randomwords })
      try {
        result.value = [ mockedShuffle(arr), shuffle(new Array(32768)) ]
      } catch(err) {
        result.error = err
      }
    })
    it('returns a new Array instance of the same length, ' +
    'containing all elements of the input array in random order', () => {
      expect(result.error).toBeUndefined()
      expect(result.value.length).toBe(2)
      expect(result.value[0]).toEqual([ 4, 3, 2, 1 ])
      expect(result.value[1]).toEqual(jasmine.any(Array))
      expect(result.value[1].length).toBe(32768)
      expect(arr).toEqual([ 1, 2, 3, 4 ])
      expect(randomwords).toHaveBeenCalledWith(3)
    })
  })

  describe('when given an Array instance with more than 32768 elements, ' +
  'or anything else than an Array instance', () => {
    beforeEach(() => {
      const shuffle = getShuffle()
      result.value = []
      result.error = []
      ;[ new Array(32769), true, 42, 'foo', () => {}, { foo: 'foo' } ]
      .reduce((result: TestResult, arg: any) => {
        try {
          result.value.push((<any>shuffle)(arg))
        } catch (err) {
          result.error.push(err)
        }
        return result
      }, result)
    })

    it('throws an `invalid argument` TypeError', () => {
      expect(result.value.length).toBe(0)
      expect(result.error.length).toBe(6)
      result.error.forEach((error: any) => {
        expect(error).toEqual(jasmine.any(TypeError))
        expect(error.message).toBe('invalid argument')
      })
    })
  })
})