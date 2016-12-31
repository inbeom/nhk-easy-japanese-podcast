require('isomorphic-fetch')

const Podcast = require('podcast')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

app.get('/ko/feed.xml', (req, res, next) => {
  fetch('http://www.nhk.or.jp/lesson/korean/download/')
    .then((rsp) => rsp.text())
    .then((text) => {
      const feed = composeFeed(
        {
          title: '일본말 첫걸음 - NHK월드 라디오일본',
          description: '일본의 공공방송 NHK가 신뢰할 수 있는 일본어 강좌를 무료 팟캐스트로 제공하고 있습니다. 도쿄의 한 대학에서 일본어를 공부하는 안나의 이야기를 들으며 문법과 어휘를 공부할 수 있습니다. nhk.jp/lesson',
          site_url: 'http://www.nhk.or.jp/lesson/english/',
          image_url: 'http://www.nhk.or.jp/lesson/common/images/podcast/english.jpg',
          language: 'ko',
          author: 'NHK WORLD RADIO JAPAN',
          copyright: 'NHK (Japan Broadcasting Corporation)',
          itunesAuthor: 'NHK WORLD RADIO JAPAN',
          itunesSubtitle: '일본의 공공방송 NHK가 신뢰할 수 있는 일본어 강좌를 무료 팟캐스트로 제공하고 있습니다. 도쿄의 한 대학에서 일본어를 공부하는 안나의 이야기를 들으며 문법과 어휘를 공부할 수 있습니다. nhk.jp/lesson',
          itunesExplicit: false,
          itunesCategory: { text: 'Education', subcats: [{ text: 'Language Courses' }] },
          itunesImage: 'http://www.nhk.or.jp/lesson/common/images/podcast/english.jpg'
        },
        text
      )

      res.set('Content-Type', 'text/xml')
      res.send(feed.xml())
    })
    .catch(next)
})

app.get('/en/feed.xml', (req, res, next) => {
  fetch('http://www.nhk.or.jp/lesson/english/download/')
    .then((rsp) => rsp.text())
    .then((text) => {
      const feed = composeFeed(
        {
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
        },
        text
      )

      res.set('Content-Type', 'text/xml')
      res.send(feed.xml())
    })
    .catch(next)
})

app.listen(process.env.PORT || 3000)

function composeFeed (feedAttributes, pageBody) {
  const feed = new Podcast(feedAttributes)
  const $ = cheerio.load(pageBody)

  $('.dl-list-inner').each((_, element) => {
    $element = $(element)

    if (!$element.hasClass('set-dl')) {
      feed.item({
        title: $element.find('.le-link dl dt').text(),
        description: $element.find('.le-link dl dd').text(),
        url: `http://www.nhk.or.jp${$element.find('.le-link').attr('href')}`,
        enclosure:{
          url: `http://www.nhk.or.jp${$element.find('.dl-mp3 a').attr('href')}`
        },
        itunesAuthor: feedAttributes.author,
        itunesExplicit: false,
        itunesSummary: $element.find('.le-link dl dd').text(),
        itunesDuration: 600
      })
    }
  })

    return feed
}
