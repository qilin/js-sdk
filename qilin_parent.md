### Биллинг

Создаем объект-хэлпер внутри тега script.

```
const qilinParentHelper = qilinGameFrame(payFormCallback)
```

Где `PayFormCallback` функция осуществляющая бизнес-логику биллинга, и возвращаюшая промисс, который резолвится в статус покупки: `true` - успешно,`false` - отмена или ошибка при проведении операции.
```
PayFormCallback = (gameUid: string, userId: string, itemId: string) => Promise;
```

Когда iframe игры делает запрос на открытие формы биллинга, хэлпер вызывает `PayFormCallback`, дожидается ответа и отправляет статус операции в игру.
