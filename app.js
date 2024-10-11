const container = document.getElementById('root')
const ajax = new XMLHttpRequest();
const content = document.createElement('div')
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'

ajax.open("GET", NEWS_URL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);

const ul = document.createElement("ul");

window.addEventListener('hashchange', function() {
  // 밑에서 a.href = `#${newsFeed[i].id}`를 선언했으므로 a태그가 클릭되었을 때 #(해시)값이 바뀌는 것을 추적할 수 있다. 따라서 hashchange event를 이용했다.
  const id = location.hash.substring(1)
  // .substring method는 인수로 숫자를 넣어 해당 숫자 이후의 string만 반환한다.
  // .replace('#', '')을 사용하지 않고도 .substring method로 데이터 처리 가능

  ajax.open('GET', CONTENT_URL.replace('@id', id), false)
  ajax.send()

  const newsContents = JSON.parse(ajax.response)
  const title = document.createElement('h1')

  title.innerHTML = newsContents.title
  content.appendChild(title)
})

for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})` ;

  ul.appendChild(li).appendChild(a);
}

container.appendChild(ul);
container.appendChild(content)