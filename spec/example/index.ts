/**
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
import getShuffle from '../../src'
const shuffle = getShuffle() // optionally inject 'randombytes' replacement with { randombytes: replacement }

import debug = require('debug')
const log = debug('example')

const entries = [ 1, 2, 3, 4, 5, 6, 7, 8 ]
const shuffled = shuffle(entries) // 'shuffled' is a new array instance, 'entries' remains unchanged.

shuffled.forEach(log)
