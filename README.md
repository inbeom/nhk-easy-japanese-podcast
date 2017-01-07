# NHK World Easy Japanese as a Podcast

[See this in action](https://nhk-world-easy-japanese.herokuapp.com/en/feed.xml)

[Easy Japanese](https://www.nhk.or.jp/lesson/english/) is a free radio program
of Japenese language lessons for foreign language speakers.

Despite of the fact that the provided resources are one of the best materials
for Japanese language learning freely available on the internet, I felt quite
annoyed to download and arrange all the 48 episodes for my increasing number of
devices. We should do something to make this feel less irritating to people
living in the 21st century.

This short piece of software will convert the episode listings provided by NHK
into podcasts, making it easy to get individual episodes and to track your
learning progressions.

## Usage

Clone the repository:

```
$ git clone git@github.com:inbeom/nhk-easy-japanese-podcast.git && cd nhk-easy-japanese-podcast
```

Install dependencies:

```
$ npm install
```

Run:

```
$ PORT=3000 npm start
```

Navigate:

```
$ curl http://localhost:3000/en/feed.xml
```

## Things to do

  - Integrating download link and/or text representation of non-verbal learning
    materials with each episode.
  - Supporting the all available languages.
