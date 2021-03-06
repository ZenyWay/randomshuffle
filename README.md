# randomshuffle [![Join the chat at https://gitter.im/ZenyWay/randomshuffle](https://badges.gitter.im/ZenyWay/randomshuffle.svg)](https://gitter.im/ZenyWay/randomshuffle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![NPM](https://nodei.co/npm/randomshuffle.png?compact=true)](https://nodei.co/npm/randomshuffle/)
[![build status](https://travis-ci.org/ZenyWay/randomshuffle.svg?branch=master)](https://travis-ci.org/ZenyWay/randomshuffle)
[![coverage status](https://coveralls.io/repos/github/ZenyWay/randomshuffle/badge.svg?branch=master)](https://coveralls.io/github/ZenyWay/randomshuffle)
[![Dependency Status](https://gemnasium.com/badges/github.com/ZenyWay/randomshuffle.svg)](https://gemnasium.com/github.com/ZenyWay/randomshuffle)

cryptographically-secure random shuffle of array entries
with the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

# <a name="example"></a> example
```ts
import getShuffle from 'randomshuffle'
const shuffle = getShuffle() // optionally inject 'randomwords' replacement with { randomwords: replacement }

import debug = require('debug')
const log = debug('example')

const entries = [ 1, 2, 3, 4, 5, 6, 7, 8 ]
const shuffled = shuffle(entries) // 'shuffled' is a new array instance, 'entries' remains unchanged.

shuffled.forEach(log) // elements from 'entries' in random order
```

a live version of this example can be viewed [here](https://cdn.rawgit.com/ZenyWay/randomshuffle/v1.0.0/spec/example/index.html)
in the browser console,
or by cloning this repository and running the following commands from a terminal:
```bash
npm install
npm run example
```
the files of this example are available [here](./spec/example).

# <a name="api"></a> API v1.0 stable
`ES5` and [`Typescript`](http://www.typescriptlang.org/) compatible.
coded in `Typescript 2`, transpiled to `ES5`.

for a detailed specification of the API,
run the [unit tests](https://cdn.rawgit.com/ZenyWay/randomshuffle/v1.0.0/spec/web/index.html)
in your browser.

# <a name="contributing"></a> CONTRIBUTING
see the [contribution guidelines](./CONTRIBUTING.md)

# <a name="license"></a> LICENSE
Copyright 2016 Stéphane M. Catala

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the [License](./LICENSE) for the specific language governing permissions and
Limitations under the License.
