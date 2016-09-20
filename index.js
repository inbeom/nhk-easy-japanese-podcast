require('isomorphic-fetch')

let Podcast = require('podcast')
let cheerio = require('cheerio')
let express = require('express')

let app = express()

app.get('/feed.xml', (req, res, next) => {
  let feed = new Podcast({
    title: 'Easy Japanese',
    description: 'Japan\'s only public broadcaster NHK provides this reliable Japanese language course with free podcast. You can easily start learning basic grammar and vocabulary by listening to the story of Anna, who studies Japanese at a university in Tokyo. nhk.jp/lesson',
    site_url: 'http://www.nhk.or.jp/lesson/english/',
    image_url: 'http://www.nhk.or.jp/lesson/common/images/podcast/english.jpg',
    language: 'en',
    author: 'NHK WORLD RADIO JAPAN',
    copyright: 'NHK (Japan Broadcasting Corporation)',
    itunesAuthor: 'NHK WORLD RADIO JAPAN',
    itunesSubtitle: 'Japan\'s only public broadcaster NHK provides this reliable Japanese language course with free podcast. You can easily start learning basic grammar and vocabulary by listening to the story of Anna, who studies Japanese at a university in Tokyo. nhk.jp/lesson',
    itunesExplicit: false,
    itunesCategory: { text: 'Education', subcats: [{ text: 'Language Courses' }] },
    itunesImage: 'http://www.nhk.or.jp/lesson/common/images/podcast/english.jpg'
  })

  fetch('http://www.nhk.or.jp/lesson/english/download/')
  .then((rsp) => rsp.text())
  .then((text) => {
    $ = cheerio.load(text)

    $('.dl-list-inner').each((_, element) => {
      $element = $(element)

      feed.item({
        title: $element.find('.le-link dl dt').text(),
        description: $element.find('.le-link dl dd').text(),
        url: $element.find('.dl-mp3 a').attr('href')
      })
    })

    res.set('Content-Type', 'text/xml')
    res.send(feed.xml())
  })
  .catch(next)
})

app.listen(3000)
