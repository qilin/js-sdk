## Описание

При использовании `js-sdk` в `qiline store` на сторонних сайтах, в целях безопасности при инициализации хэлпер из js-sdk получает `url`.
Но это `url` не непосредственно игры, а нашего промежуточного узла, на котором отдается статическая `html` страница с подключенным скриптом адаптера.
Который передает на наш сервер свой `url`, в котором в квери параметре прописан токен и получает в ответ `url` для открытия самой игры.
Открывает `iframe` с этим `url` и проксирует все запросы между `iframe` игры и стором.
