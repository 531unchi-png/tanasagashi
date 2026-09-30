import {normalize} from './search.mjs';
// Labels follow the inventory's names; do not infer a legal manufacturer from generic product names.
const definitions=[
 ['KITZ','キッツ'],['KVK','ケーブイケー'],['SANEI','サンエイ','三栄'],['TOTO','トートー'],
 ['積水','セキスイ'],['因幡','イナバ'],['前澤','前沢','マエザワ'],['アロン'],['アカギ'],
 ['ベンカン'],['ベン'],['日邦','ニッポウ'],['山清','ヤマセイ'],['ヤマイチ'],['川西'],['弥栄'],
 ['リケン'],['イノアック'],['キーロン'],['ミヤナガ'],['コスモ'],['オーミヤ'],['カクダイ'],
 ['MCC'],['若井'],['BOSCH','ボッシュ'],['東栄管機'],['タブチ'],['日本製鉄'],['REX','レッキス'],
 ['アキレス'],['タキロン'],['竹村'],['モリイ'],['IFT'],['多久販売'],['大見工業'],['コベルコ'],
 ['アサヒAV'],['日東電工'],['TOP'],['日立'],['神王工業'],['オンダ'],['日之出'],['日東工器'],
 ['ノーリツ'],['森永'],['マーベル'],['ベッセル'],['ネグロス'],['ミヤコ'],['兼工業'],['長府'],
 ['オーケー'],['FLOBAL','フローバル'],['クボタ'],['アサダ'],['キョーワ'],['アウス'],['TASCO','タスコ'],
 ['モリテック'],['ユニカ'],['ベン'],['ヨシタケ'],['ロビネア'],['CK'],['CCI']
];
const rules=definitions.flatMap(([name,...aliases])=>[name,...aliases].map(prefix=>({name,prefix:normalize(prefix)}))).sort((a,b)=>b.prefix.length-a.prefix.length);
export function manufacturerOf(p){
 const registered=String(p.manufacturer||'').trim();
 if(registered)return rules.find(r=>r.prefix===normalize(registered))?.name||registered;
 const name=normalize(p.name).replace(/^[*＊※]+/,'');
 return rules.find(r=>name.startsWith(r.prefix))?.name||'未分類';
}
export function manufacturerIndex(products){
 const counts=new Map();
 for(const p of products){const name=manufacturerOf(p);counts.set(name,(counts.get(name)||0)+1);}
 return [...counts].map(([name,count])=>({name,count,terms:[name,...(definitions.find(d=>d[0]===name)||[])].map(normalize)})).sort((a,b)=>a.name==='未分類'?1:b.name==='未分類'?-1:a.name.localeCompare(b.name,'ja'));
}
export function matchManufacturer(item,query){return query.normalize('NFKC').trim().split(/\s+/).filter(Boolean).every(q=>item.terms.some(t=>t.includes(normalize(q))));}