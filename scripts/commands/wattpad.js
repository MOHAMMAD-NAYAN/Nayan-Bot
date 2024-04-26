const axios = require('axios'),
cheerio = require('cheerio')
module.exports.config = {
  name: 'wattpad',
  version: '1.0.0',
  prefix: false,
  permission: 0,
  credits: 'ryuko',
  description: '',
  category: 'without prefix',
  cooldowns: 5,
}
module.exports.run = async ({
  api: _0x47c91f,
  event: _0x576fa7,
  args: _0x588a55,
}) => {
  const _0x815d6b = _0x588a55.join(' ')
  axios
    .get('https://www.wattpad.com/search/' + _0x815d6b)
    .then(({ data: _0x58b6e1 }) => {
      const _0x4446da = cheerio.load(_0x58b6e1),
        _0x194528 = []
      _0x4446da('div.story-card-data.hidden-xxs > div.story-info').each(
        function (_0x102ad2, _0x4ec10a) {
          const _0x12f39f = {
            status: 200,
            author: '@Hazeyy',
            title: _0x4446da(_0x4ec10a).find('> div.title').text(),
            view: _0x4446da(_0x4ec10a)
              .find(
                '> ul > li:nth-child(1) > div.icon-container > div > span.stats-value'
              )
              .text(),
            vote: _0x4446da(_0x4ec10a)
              .find(
                '> ul > li:nth-child(2) > div.icon-container > div > span.stats-value'
              )
              .text(),
            chapter: _0x4446da(_0x4ec10a)
              .find(
                '> ul > li:nth-child(3) > div.icon-container > div > span.stats-value'
              )
              .text(),
            url:
              'https://www.wattpad.com/' +
              _0x4446da(_0x4ec10a).find('a').attr('href'),
            thumb: _0x4446da(_0x4ec10a).find('> div.cover > img').attr('src'),
            description: _0x4446da(_0x4ec10a)
              .find('> div.description')
              .text()
              .replace(/\n/g, ''),
          }
          _0x194528.push(_0x12f39f)
        }
      )
      _0x47c91f.sendMessage(
        'searching for stories, please wait...',
        _0x576fa7.threadID
      )
      const _0x2e2beb = _0x194528.slice(0, 2)
      let _0x49a5c3 = ''
      _0x2e2beb.forEach((_0x3abfb3, _0x26ef55) => {
        _0x49a5c3 +=
          '' +
          (_0x26ef55 + 1) +
          '. title: ' +
          _0x3abfb3.title +
          '\nauthor: ' +
          'ryuko' +
          '\nviews: ' +
          _0x3abfb3.view +
          '\nvotes: ' +
          _0x3abfb3.vote +
          '\nchapters: ' +
          _0x3abfb3.chapter +
          '\ndescription: ' +
          _0x3abfb3.description +
          '\nlink : ' +
          _0x3abfb3.url +
          '\n\n'
      })
      _0x47c91f.sendMessage(_0x49a5c3, _0x576fa7.threadID, _0x576fa7.messageID)
    })
    .catch((_0x2ff16b) => {
      console.error(_0x2ff16b)
      _0x47c91f.sendMessage(
        'having some unexpected error, please try again later.',
        _0x576fa7.threadID,
        _0x576fa7.messageID
      )
    })
}