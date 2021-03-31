# phrase_cutter

## 公開サイト  
https://phrase-cutter.vercel.app/

## 利用技術  
・kuromoji  
https://www.atilika.com/ja/kuromoji/

## how-to-use

```
git clone git@github.com:ogadra/phrase_cutter.git
cd phrase_cutter
npm install
npm dev run
```

## 作成動機
https://www.youtube.com/watch?v=EbOV9XBkIY0&t=2s

## 使用目的
視線を移動させずに文章を読むことを目的とした`言語走者`と、一定のスピードで文章を読むことを目的とした`演説奏者`の2つの機能が含まれます。

### 言語走者
一般に文章を読む際に視線移動はオーバーヘッドであると認識されており、文章レイアウトを変更することで読み効率が向上することが知られている。
- [小林, 関口, 新堀, 川嶋 文節間改行レイアウトを有する日本語リーダーの読み効率評価 2014](https://www.jstage.jst.go.jp/article/tjsai/30/2/30_30_479/_pdf)
- [DNP 読書アシスト](https://lp.reading-assist.com/)

英語では、画面上に単語を次々と表示し速読を援助してくれる[spritz](https://spritz.com/)というサービスが存在したり、あるいはKindleに[Word Runner](https://www.youtube.com/watch?v=noZ3oTgeqYE)という機能が実装されていたりするが、日本語は単語と単語の区切りが分かりづらいなどの理由から、そのようなサービスは見つからなかった。
そこで形態素解析という手法を用い、それを実現しようとしたのが`言語走者`である。

### 演説走者
プレゼンテーションの際、緊張して普段より早く喋ってしまったりすることはよくあることです。演説走者では文章を常に一定のスピードで単語(文節)をハイライトすることにより、スピーチの速度を一定にする練習をすることができます。