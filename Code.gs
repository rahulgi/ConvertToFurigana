/**
 * Author: Rahul Gupta-Iwasaki
 * Link: https://github.com/rahulgi/ConvertToFurigana
 * Version: 1.0
 */

/**
 * A custom function that takes input text and converts it to Furigana.
 *
 * You can optionally pass a string to use as a separator converted
 * Furigana words.
 *
 * This function uses the Yahoo Japan Furigana conversion API. This means
 * that any text you convert will be sent to Yahoo's servers.
 *
 * Example usages:
 *   ConvertToFurigana(A1)
 *   ConvertToFurigana(”学校")
 *   ConvertToFurigana("学校は何処ですか？", ",")
 *     results in: "がっこう,は,どこ,ですか"
 */
function ConvertToFurigana(inputText, separator) {
  if (separator === undefined) {
    separator = '';
  }
  var rootUri = 'https://jlp.yahooapis.jp/FuriganaService/V1/furigana';
  var appId = 'dj00aiZpPXg4WmZkZ3NOM2NLaSZzPWNvbnN1bWVyc2VjcmV0Jng9ODY-';
  var sentence = encodeURIComponent(inputText);
  
  var url = rootUri + '?' + 'appid=' + appId + '&sentence=' + sentence;
  var responseXml = UrlFetchApp.fetch(url).getContentText();
  var document = XmlService.parse(responseXml);
  var furigana = XmlService.getNamespace('urn:yahoo:jp:jlp:FuriganaService');
  
  var result = document.getRootElement().getChild("Result", furigana);
  var wordList = result.getChild('WordList', furigana);
  var words = wordList.getChildren('Word', furigana);
  
  var furiganaWords = [];
  for (var i = 0; i < words.length; ++i) {
    var furiganaWord = words[i].getChild('Furigana', furigana);
    if (furiganaWord) {
      furiganaWords.push(furiganaWord.getText());
    }
  }
  return furiganaWords.join(separator);
}
