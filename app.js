const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData (url) {
  ajax.open("GET", url, false);
  ajax.send();

  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL)

const ul = document.createElement("ul");

window.addEventListener("hashchange", function () {
  // 밑에서 a.href = `#${newsFeed[i].id}`를 선언했으므로 a태그가 클릭되었을 때 #(해시)값이 바뀌는 것을 추적할 수 있다. 따라서 hashchange event를 이용했다.
  const id = location.hash.substring(1);
  // .substring method는 인수로 숫자를 넣어 해당 숫자 이후의 string만 반환한다.
  // .replace('#', '')을 사용하지 않고도 .substring method로 데이터 처리 가능

  const newsContents = getData(CONTENT_URL)
  const title = document.createElement("h1");

  title.innerHTML = newsContents.title;
  content.appendChild(title);
});

for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");
  const li = document.createElement("li");
  const a = document.createElement("a");

  div.innerHTML = `
  <li>
    <a href='#${newsFeed[i].id}'>
      ${newsFeed[i].title} (${newsFeed[i].comments_count})
    </a>
  </li>
  `;

  ul.appendChild(div.children[0]);
}

container.appendChild(ul);
container.appendChild(content);
