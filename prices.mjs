// メーカー公式ページで品番と税別価格を確認できた商品だけを登録する。
// 金額はメーカー希望小売価格（税別）。仕入価格・販売価格ではない。
const verifiedListPrices={
  'KVK K3':{yen:6600,checked:'2026-10-01',source:'https://www.kvk.co.jp/support/category/detail/K3.html'},
  'KVK K6':{yen:5600,checked:'2026-10-01',source:'https://www.kvk.co.jp/support/category/detail/K6.html'},
  'KVK K8Z':{yen:5700,checked:'2026-10-01',source:'https://www.kvk.co.jp/support/category/water/water06/'},
  'KVK K10':{yen:6500,checked:'2026-10-01',source:'https://www.kvk.co.jp/support/category/detail/K10.html'},
  'KVK K31-P2':{yen:8800,checked:'2026-10-01',source:'https://www.kvk.co.jp/support/category/detail/K31-P2.html'},
  'ｻﾝｴｲ Y1433T6V':{yen:11700,checked:'2026-10-01',source:'https://www.sanei.ltd/products/y1433t6v/'},
  'ｻﾝｴｲ Y143CTV-1-13':{yen:8800,checked:'2026-10-01',source:'https://www.sanei.ltd/products/y143ctv-1-13/'}
};

export function listPriceFor(product){return verifiedListPrices[String(product?.code||'')]||null;}
export function formatListPrice(price){return price?'￥'+Number(price.yen).toLocaleString('ja-JP'):'';}
export const verifiedPriceCount=Object.keys(verifiedListPrices).length;

