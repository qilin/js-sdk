### Биллинг

Создаем объект-хэлпер внутри тега script.

```
const qilinParentHelper = qilinParentFrame(
  qilinProductUUID: string,
  apiURL: string,
);
```

Для запуска авторизации вызываем метод `init` у объекта-хэлпера.

```
qilinParentHelper.init()
  .then(meta => {
    ... Код игры
  })
  .catch(error => {
    ... Обработка ошибки авторизации
  })
```

Где `meta` объект с обязательным полем `url` и любыми другими полями. 
`url` - адрес для открытия `iframe` с игрой, с прописанным `jwt` токеном.

`qilinParentHelper.onShowPayForm` - метод, устанавливающий обработчик на открытие платежной формы.

```
qilinParentHelper.onShowPayForm(payFormCallback);
```

Где `PayFormCallback` функция осуществляющая бизнес-логику биллинга, и возвращаюшая промисс, который резолвится в статус покупки: `true` - успешно,`false` - отмена или ошибка при проведении операции.
```
PayFormCallback = (qilinProductUUID: string, userId: string, itemId: string) => Promise;
```

Когда iframe игры делает запрос на открытие формы биллинга, хэлпер вызывает `PayFormCallback`, дожидается ответа и отправляет статус операции в игру.
