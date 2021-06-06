 

class NumberMinify {

    static abbreviate(number, maxPlaces, forcePlaces, forceLetter) {
        number = Number(number)
        forceLetter = forceLetter || false
        if(forceLetter !== false) {
          return annotate(number, maxPlaces, forcePlaces, forceLetter)
        }
        var abbr
        if(number >= 1e12) {
          abbr = 'T'
        }
        else if(number >= 1e9) {
          abbr = 'B'
        }
        else if(number >= 1e6) {
          abbr = 'M'
        }
        else if(number >= 1e3) {
          abbr = 'K'
        }
        else {
          abbr = ''
        }
        return this.annotate(number, maxPlaces, forcePlaces, abbr)
    }
    
    static annotate(number, maxPlaces, forcePlaces, abbr) {
        // set places to false to not round
        var rounded = 0
        switch(abbr) {
          case 'T':
            rounded = number / 1e12
            break
          case 'B':
            rounded = number / 1e9
            break
          case 'M':
            rounded = number / 1e6
            break
          case 'K':
            rounded = number / 1e3
            break
          case '':
            rounded = number
            break
        }
        if(maxPlaces !== false) {
          var test = new RegExp('\\.\\d{' + (maxPlaces + 1) + ',}$')
          if(test.test(('' + rounded))) {
            rounded = rounded.toFixed(maxPlaces)
          }
        }
        if(forcePlaces !== false) {
          rounded = Number(rounded).toFixed(forcePlaces)
        }
        return rounded + abbr
    }
}

export default NumberMinify