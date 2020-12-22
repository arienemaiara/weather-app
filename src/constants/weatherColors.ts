type ColorsTypeMap = {
  [key: string]: {
    background: string
    color: string
  }
}

export const weatherColors: ColorsTypeMap = {
  '01d': {
    'background': '#ffcd00',
    'color': '#fff'
  },  //clear - day
  '01n': {
    'background': '#235949',
    'color': '#fff'
  }, //clear - night
  '02d': {
    'background': '#b4bbc0',
    'color': '#fff'
  }, //partly cloudy - day
  '02n': {
    'background': '#b4bbc0',
    'color': '#fff'
  }, //partly cloudy - night
  '03d': {
    'background': '#b4bbc0',
    'color': '#fff'
  }, //scattered clouds - day
  '03n': {
    'background': '#235949',
    'color': '#fff'
  }, //scattered clouds - night
  '04d': {
    'background': '#dce6ed',
    'color': '#fff'
  }, //broken clouds - day
  '04n': {
    'background': '#ffcd00',
    'color': '#fff'
  }, //broken clouds - night
  '09d': {
    'background': '#ffcd00',
    'color': '#fff'
  }, // showers - day
  '09n': {
    'background': '#ffcd00',
    'color': '#fff'
  }, // showers - night
  '10d': {
    'background': '#ffcd00',
    'color': '#fff'
  }, // rain - day
  '10n': {
    'background': '#235949',
    'color': '#fff'
  }, // rain - night
  '11d': {
    'background': '#ffcd00',
    'color': '#fff'
  }, // thunderstorm - day
  '11n': {
    'background': '#ffcd00',
    'color': '#fff'
  }, // thunderstorm - night
  '13d': {
    'background': '#ffcd00',
    'color': '#fff'
  }, //snow - day
  '13n': {
    'background': '#ffcd00',
    'color': '#fff'
  }, //snow - night
  '50d': {
    'background': '#81a8b9',
    'color': '#fff'
  }, // mist/rain - day
  '50n': {
    'background': '#ffcd00',
    'color': '#fff'
  }, // mist/rain - night
}